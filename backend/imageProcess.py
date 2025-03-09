"""
Standalone image processing module for farm image analysis
This file can be placed in the root directory for easier Celery integration
"""
import os
import cv2
import numpy as np
import uuid
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('image_processor')

# Results directory for analysis images
RESULTS_DIR = "results"
try:
    os.makedirs(RESULTS_DIR, exist_ok=True)
    # Verify write permissions
    test_file_path = os.path.join(RESULTS_DIR, "test_write.tmp")
    with open(test_file_path, 'w') as f:
        f.write("test")
    os.remove(test_file_path)
    logger.info(f"Results directory ready: {os.path.abspath(RESULTS_DIR)}")
except Exception as e:
    logger.error(f"Error setting up results directory: {str(e)}")
    # Fall back to a directory we're more likely to have permission for
    RESULTS_DIR = os.path.join(os.path.expanduser("~"), "farm_analysis_results")
    os.makedirs(RESULTS_DIR, exist_ok=True)
    logger.info(f"Using fallback results directory: {RESULTS_DIR}")

class ImageProcessor:
    """
    Class for processing farm images and generating analysis
    """
    
    def __init__(self):
        # Default parameters for plant health detection
        self.healthy_green_lower = np.array([30, 50, 50])
        self.healthy_green_upper = np.array([90, 255, 255])
        
        # Default parameters for soil detection
        self.soil_lower = np.array([0, 0, 0])
        self.soil_upper = np.array([30, 255, 200])
    
    def process_image(self, image_path):
        """
        Process an image and generate health and soil analysis images
        
        Args:
            image_path: Path to the input image
            
        Returns:
            Dictionary with analysis results and paths to generated images
        """
        logger.info(f"Processing image: {image_path}")
        
        # Load image
        img = cv2.imread(image_path)
        if img is None:
            error_msg = f"Could not read image: {image_path}"
            logger.error(error_msg)
            raise ValueError(error_msg)
            
        # Convert to RGB (from BGR)
        rgb_image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            
        # Convert to HSV for better color analysis
        hsv_image = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2HSV)
        
        # Generate unique filenames for the output images
        health_image_name = f"{str(uuid.uuid4())}_plant_health.jpg"
        soil_image_name = f"{str(uuid.uuid4())}_soil_analysis.jpg"
        
        health_image_path = os.path.join(RESULTS_DIR, health_image_name)
        soil_image_path = os.path.join(RESULTS_DIR, soil_image_name)
        
        # Generate plant health visualization
        health_img, health_percentage = self._detect_plant_health(rgb_image, hsv_image)
        
        # Generate soil analysis visualization
        soil_img, moisture_estimate = self._analyze_soil(rgb_image, hsv_image)
        
        # Save the visualizations with error handling
        health_success = self._save_image(health_img, health_image_path)
        soil_success = self._save_image(soil_img, soil_image_path)
        
        # Return basic results with file paths
        result = {
            "plant_health_percentage": round(health_percentage, 2),
            "estimated_soil_moisture": round(moisture_estimate, 2),
        }
        
        # Only include image paths if saving was successful
        if health_success:
            result["plant_health_image"] = health_image_path
        else:
            logger.warning("Failed to save plant health image")
            
        if soil_success:
            result["soil_analysis_image"] = soil_image_path
        else:
            logger.warning("Failed to save soil analysis image")
            
        logger.info(f"Image processing completed for: {image_path}")
        return result
    
    def _save_image(self, rgb_image, output_path):
        """
        Convert RGB image to BGR and save to disk with verification
        
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Make sure the output directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # Convert RGB to BGR for OpenCV
            bgr_image = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2BGR)
            
            # Save the image
            success = cv2.imwrite(output_path, bgr_image)
            
            # Verify the file exists and has content
            if success and os.path.exists(output_path) and os.path.getsize(output_path) > 0:
                logger.info(f"Successfully saved image to: {output_path}")
                return True
            else:
                logger.error(f"Failed to save image to: {output_path}")
                return False
                
        except Exception as e:
            logger.error(f"Error saving image to {output_path}: {str(e)}")
            return False
    
    def _detect_plant_health(self, rgb_image, hsv_image):
        """Identify areas where plant color indicates potential health issues"""
        # Create mask for healthy plants
        healthy_mask = cv2.inRange(hsv_image, self.healthy_green_lower, self.healthy_green_upper)
        
        # Create general plant mask (anything significantly green)
        plant_lower = np.array([20, 30, 30])
        plant_upper = np.array([100, 255, 255])
        general_plant_mask = cv2.inRange(hsv_image, plant_lower, plant_upper)
        
        # Clean up the plant mask
        kernel = np.ones((5,5), np.uint8)
        general_plant_mask = cv2.morphologyEx(general_plant_mask, cv2.MORPH_OPEN, kernel)
        general_plant_mask = cv2.morphologyEx(general_plant_mask, cv2.MORPH_CLOSE, kernel)
        
        # Find unhealthy plant regions (plants that aren't in the healthy green range)
        unhealthy_mask = cv2.bitwise_and(general_plant_mask, cv2.bitwise_not(healthy_mask))
        
        # Calculate health percentage
        total_plant_pixels = cv2.countNonZero(general_plant_mask)
        if total_plant_pixels == 0:  # No plants detected
            health_percentage = 0
        else:
            unhealthy_pixels = cv2.countNonZero(unhealthy_mask)
            health_percentage = 100 - (unhealthy_pixels / total_plant_pixels * 100)
        
        # Create visualization
        health_viz = rgb_image.copy()
        
        # Create semi-transparent overlay
        overlay = health_viz.copy()
        
        # Mark healthy plants in green
        overlay[healthy_mask > 0] = [0, 255, 0]
        
        # Mark unhealthy plants in red
        overlay[unhealthy_mask > 0] = [255, 0, 0]
        
        # Blend with original
        cv2.addWeighted(overlay, 0.5, health_viz, 0.5, 0, health_viz)
        
        return health_viz, health_percentage
    
    def _analyze_soil(self, rgb_image, hsv_image):
        """Analyze soil color and estimate moisture content"""
        # Create soil mask using color thresholding
        soil_mask = cv2.inRange(hsv_image, self.soil_lower, self.soil_upper)
        
        # Clean up the mask
        kernel = np.ones((5,5), np.uint8)
        soil_mask = cv2.morphologyEx(soil_mask, cv2.MORPH_OPEN, kernel)
        soil_mask = cv2.morphologyEx(soil_mask, cv2.MORPH_CLOSE, kernel)
        
        # Calculate soil statistics
        if cv2.countNonZero(soil_mask) > 0:
            soil_pixels = rgb_image[soil_mask > 0]
            avg_color = np.mean(soil_pixels, axis=0).astype(int)
            
            # Simple moisture estimate based on darkness
            brightness = np.mean(avg_color)
            moisture_estimate = 100 - (brightness / 255 * 100)
        else:
            avg_color = np.array([0, 0, 0])
            moisture_estimate = 0
        
        # Create visualization
        soil_viz = rgb_image.copy()
        
        # Create semi-transparent overlay
        overlay = soil_viz.copy()
        
        # Blue tint for soil regions
        overlay[soil_mask > 0] = [100, 100, 255]
        
        # Blend with original
        cv2.addWeighted(overlay, 0.5, soil_viz, 0.5, 0, soil_viz)
        
        return soil_viz, moisture_estimate

# Create a single instance of the image processor
image_processor = ImageProcessor()

def process_image_sync(image_path):
    """Synchronous function to process an image - can be called from Celery"""
    
    absolute_path = os.path.abspath(image_path)
    logger.info(f"Processing request for image: {absolute_path}")

    if not os.path.exists(absolute_path):
        error_msg = f"Image file not found: {absolute_path}"
        logger.error(error_msg)
        raise FileNotFoundError(error_msg)
    
    try:
        # Process the image
        results = image_processor.process_image(absolute_path)
        
        # Verify the output images exist
        missing_files = []
        if "plant_health_image" in results and not os.path.exists(results["plant_health_image"]):
            missing_files.append(results["plant_health_image"])
        if "soil_analysis_image" in results and not os.path.exists(results["soil_analysis_image"]):
            missing_files.append(results["soil_analysis_image"])
            
        if missing_files:
            logger.warning(f"Some output files are missing: {missing_files}")
            
        return results
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}", exc_info=True)
        raise