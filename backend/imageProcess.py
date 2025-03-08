#!/usr/bin/env python3
import cv2
import numpy as np
import matplotlib.pyplot as plt
import argparse
import os

class FarmImageAnalyzer:
    """
    A class to analyze farm images for plant health, soil conditions, and plant counting
    with support for detecting highlighted farm boundaries of any shape.
    """
    
    def __init__(self):
        # Default parameters - adjust these for your specific crops and conditions
        self.healthy_green_lower = np.array([30, 50, 50])
        self.healthy_green_upper = np.array([90, 255, 255])
        
        self.soil_lower = np.array([0, 0, 0])
        self.soil_upper = np.array([30, 255, 200])
        
        self.min_plant_size = 100  # Minimum area in pixels to be considered a plant
        
        # Border detection parameters
        self.detect_border = True  # Whether to automatically detect a highlighted border
        self.border_color_ranges = [
            # Bright colors (common for highlighted borders)
            ([200, 200, 200], [255, 255, 255]),  # White
            ([0, 200, 200], [100, 255, 255]),    # Yellow
            ([200, 0, 0], [255, 100, 100]),      # Red
            ([0, 200, 0], [100, 255, 100]),      # Green
            ([0, 0, 200], [100, 100, 255])       # Blue
        ]
        
        # Store analysis results
        self.farm_mask = None      # Binary mask of farm area
        self.crop_box = None       # Bounding box of farm area [x, y, w, h]
        self.original_image = None
        self.rgb_image = None
        self.hsv_image = None
        self.gray_image = None
        
    def load_image(self, image_path):
        """Load and prepare an image for analysis"""
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image not found: {image_path}")
            
        # Load image
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError(f"Could not read image: {image_path}")
            
        # Store original image (BGR)
        self.original_image = img.copy()
        
        # Convert to RGB (from BGR)
        self.original_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Store original dimensions
        self.original_height, self.original_width = self.original_rgb.shape[:2]
        
        # Detect farm area if requested
        if self.detect_border:
            self.detect_farm_boundary()
        else:
            # Use the whole image
            self.rgb_image = self.original_rgb.copy()
            self.farm_mask = np.ones((self.original_height, self.original_width), dtype=np.uint8) * 255
            
        # Convert to HSV for better color analysis
        self.hsv_image = cv2.cvtColor(self.rgb_image, cv2.COLOR_RGB2HSV)
        
        # Convert to grayscale for general processing
        self.gray_image = cv2.cvtColor(self.rgb_image, cv2.COLOR_RGB2GRAY)
        
        return self.rgb_image
    
    def detect_farm_boundary(self):
        """
        Detect a highlighted farm boundary in the image.
        This handles non-rectangular boundaries by searching for bright border colors.
        """
        # Create an empty mask for detected borders
        border_mask = np.zeros((self.original_height, self.original_width), dtype=np.uint8)
        
        # Try each color range to detect highlighted borders
        for (lower, upper) in self.border_color_ranges:
            lower_rgb = np.array(lower, dtype=np.uint8)
            upper_rgb = np.array(upper, dtype=np.uint8)
            
            # Create a mask for this color range
            color_mask = cv2.inRange(self.original_rgb, lower_rgb, upper_rgb)
            
            # Combine with overall border mask
            border_mask = cv2.bitwise_or(border_mask, color_mask)
        
        # If no borders detected, use the whole image
        if cv2.countNonZero(border_mask) < 100:  # Minimum border size
            print("No farm boundary detected. Using the entire image.")
            self.rgb_image = self.original_rgb.copy()
            self.farm_mask = np.ones((self.original_height, self.original_width), dtype=np.uint8) * 255
            return
            
        # Clean up the border mask with morphological operations
        kernel = np.ones((3, 3), np.uint8)
        border_mask = cv2.morphologyEx(border_mask, cv2.MORPH_CLOSE, kernel, iterations=2)
        
        # Find contours in the border mask
        contours, _ = cv2.findContours(border_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        if not contours:
            print("No farm boundary contours found. Using the entire image.")
            self.rgb_image = self.original_rgb.copy()
            self.farm_mask = np.ones((self.original_height, self.original_width), dtype=np.uint8) * 255
            return
            
        # Find the largest contour (likely the farm boundary)
        largest_contour = max(contours, key=cv2.contourArea)
        
        # Create a mask for the farm area
        farm_mask_full = np.zeros((self.original_height, self.original_width), dtype=np.uint8)
        
        # Fill in the area inside the farm boundary
        cv2.drawContours(farm_mask_full, [largest_contour], 0, 255, -1)
        
        # Find the bounding box of the farm area
        x, y, w, h = cv2.boundingRect(largest_contour)
        
        # Add a small margin around the boundary
        margin = 10
        x = max(0, x - margin)
        y = max(0, y - margin)
        w = min(w + 2*margin, self.original_width - x)
        h = min(h + 2*margin, self.original_height - y)
        
        # Store the crop box
        self.crop_box = [x, y, w, h]
        
        # Crop the image to the bounding box
        self.rgb_image = self.original_rgb[y:y+h, x:x+w].copy()
        
        # Crop the mask to the same region
        self.farm_mask = farm_mask_full[y:y+h, x:x+w]
        
        print(f"Farm boundary detected. Cropped to region: x={x}, y={y}, width={w}, height={h}")
    
    def detect_plant_irregularities(self):
        """Identify areas where plant color indicates potential health issues"""
        # Create mask for healthy plants
        healthy_mask = cv2.inRange(self.hsv_image, self.healthy_green_lower, self.healthy_green_upper)
        
        # Create general plant mask (anything significantly green)
        plant_lower = np.array([20, 30, 30])
        plant_upper = np.array([100, 255, 255])
        general_plant_mask = cv2.inRange(self.hsv_image, plant_lower, plant_upper)
        
        # Clean up the plant mask
        kernel = np.ones((5,5), np.uint8)
        general_plant_mask = cv2.morphologyEx(general_plant_mask, cv2.MORPH_OPEN, kernel)
        general_plant_mask = cv2.morphologyEx(general_plant_mask, cv2.MORPH_CLOSE, kernel)
        
        # Apply farm mask to limit analysis to the farm area
        if self.farm_mask is not None:
            general_plant_mask = cv2.bitwise_and(general_plant_mask, self.farm_mask)
            healthy_mask = cv2.bitwise_and(healthy_mask, self.farm_mask)
        
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
        health_viz = self.rgb_image.copy()
        
        # Create semi-transparent overlay
        overlay = health_viz.copy()
        
        # Mark healthy plants in green
        overlay[healthy_mask > 0] = [0, 255, 0]
        
        # Mark unhealthy plants in red
        overlay[unhealthy_mask > 0] = [255, 0, 0]
        
        # Blend with original
        cv2.addWeighted(overlay, 0.5, health_viz, 0.5, 0, health_viz)
        
        return health_viz, health_percentage, general_plant_mask
    
    def analyze_soil(self):
        """Analyze soil color and estimate moisture content"""
        # Create soil mask using color thresholding
        soil_mask = cv2.inRange(self.hsv_image, self.soil_lower, self.soil_upper)
        
        # Clean up the mask
        kernel = np.ones((5,5), np.uint8)
        soil_mask = cv2.morphologyEx(soil_mask, cv2.MORPH_OPEN, kernel)
        soil_mask = cv2.morphologyEx(soil_mask, cv2.MORPH_CLOSE, kernel)
        
        # Apply farm mask to limit analysis to the farm area
        if self.farm_mask is not None:
            soil_mask = cv2.bitwise_and(soil_mask, self.farm_mask)
        
        # Calculate soil statistics
        if cv2.countNonZero(soil_mask) > 0:
            soil_pixels = self.rgb_image[soil_mask > 0]
            avg_color = np.mean(soil_pixels, axis=0).astype(int)
            std_color = np.std(soil_pixels, axis=0).astype(int)
            
            # Simple moisture estimate based on darkness
            brightness = np.mean(avg_color)
            moisture_estimate = 100 - (brightness / 255 * 100)
        else:
            avg_color = np.array([0, 0, 0])
            std_color = np.array([0, 0, 0])
            moisture_estimate = 0
        
        # Create visualization
        soil_viz = self.rgb_image.copy()
        
        # Create semi-transparent overlay
        overlay = soil_viz.copy()
        
        # Blue tint for soil regions
        overlay[soil_mask > 0] = [100, 100, 255]
        
        # Blend with original
        cv2.addWeighted(overlay, 0.5, soil_viz, 0.5, 0, soil_viz)
        
        return soil_viz, avg_color, std_color, moisture_estimate, soil_mask
    
    def count_plants(self, plant_mask=None, grid_based=True):
        """
        Count individual plants in the image using either connected components
        or a grid-based approach for aerial imagery with small, uniform plants.
        
        Args:
            plant_mask: Optional pre-computed plant mask. If None, one will be generated.
            grid_based: Whether to use grid-based detection (True) or connected components (False)
        """
        if plant_mask is None:
            # Create plant mask using color thresholding
            # For aerial imagery, we need to be more sensitive to detect small green dots
            plant_lower = np.array([30, 30, 30])  # More permissive lower threshold
            plant_upper = np.array([100, 255, 255])  # Wider upper threshold
            plant_mask = cv2.inRange(self.hsv_image, plant_lower, plant_upper)
            
            # Clean up the mask - use smaller kernel for small plants
            kernel = np.ones((3,3), np.uint8)
            plant_mask = cv2.morphologyEx(plant_mask, cv2.MORPH_OPEN, kernel)
            plant_mask = cv2.morphologyEx(plant_mask, cv2.MORPH_CLOSE, kernel)
            
            # Apply farm mask to limit analysis to the farm area
            if self.farm_mask is not None:
                plant_mask = cv2.bitwise_and(plant_mask, self.farm_mask)
        
        # Create visualization
        count_viz = self.rgb_image.copy()
        
        if grid_based:
            # Grid-based approach for aerial imagery with small, uniform plants
            
            # Step 1: Estimate the typical plant size from the image
            # Either use a fixed small size or analyze density of vegetation
            
            # Detect any red markers that might be in the image (common in agricultural imaging)
            # This helps capture manually marked plants or existing markers
            red_mask = cv2.inRange(self.rgb_image, 
                                  np.array([150, 0, 0]), 
                                  np.array([255, 100, 100]))
            
            # Try to detect red circles that may mark plants
            red_circles = []
            if cv2.countNonZero(red_mask) > 0:
                # Use Hough Circle Transform to find red circles
                red_mask_blur = cv2.GaussianBlur(red_mask, (5, 5), 0)
                circles = cv2.HoughCircles(
                    red_mask_blur, 
                    cv2.HOUGH_GRADIENT, 
                    dp=1, 
                    minDist=20,  # Minimum distance between detected centers
                    param1=50,   # Upper threshold for edge detector
                    param2=10,   # Threshold for center detection
                    minRadius=3, # Min circle radius
                    maxRadius=30 # Max circle radius
                )
                
                if circles is not None:
                    circles = np.uint16(np.around(circles))
                    print(f"Detected {len(circles[0])} red marker circles")
                    for circle in circles[0, :]:
                        x, y, r = circle
                        red_circles.append((x, y, r))
            
            plant_locations = []
            plant_sizes = []
            
            if red_circles:
                # If we found red circles, use them directly as plant markers
                # This assumes the red circles were manually placed to mark plants
                for x, y, r in red_circles:
                    plant_locations.append((int(x), int(y)))
                    plant_sizes.append(np.pi * r * r)  # Area of the circle
                
                plant_count = len(plant_locations)
                print(f"Using {plant_count} detected red circles as plant markers")
            else:
                # Determine typical plant size using vegetation density
                # First, find all potential plant pixels
                plant_pixels = cv2.countNonZero(plant_mask)
                
                # Find all connected components to estimate typical size
                num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(plant_mask)
                
                # Calculate typical plant size by analyzing the distribution of component sizes
                component_sizes = [stats[i, cv2.CC_STAT_AREA] for i in range(1, num_labels)]
                
                if component_sizes:
                    # Filter out very large and very small components
                    filtered_sizes = [s for s in component_sizes if s > 5 and s < 1000]
                    
                    if filtered_sizes:
                        # Use median size as a representative plant size
                        typical_plant_size = np.median(filtered_sizes)
                    else:
                        # Default if no good sizes found
                        typical_plant_size = 20
                else:
                    typical_plant_size = 20
                
                # Adjust minimum size to be more appropriate for aerial imagery
                # Use a fraction of the typical size to avoid missing plants
                self.min_plant_size = max(5, int(typical_plant_size * 0.5))
                
                print(f"Estimated typical plant size: {typical_plant_size:.1f} pixels")
                print(f"Using minimum plant size: {self.min_plant_size} pixels")
                
                # Set a target distance between plants based on the typical size
                grid_spacing = max(3, int(np.sqrt(typical_plant_size) * 2))
                
                # Apply grid-based peak detection
                # Identify local maxima in plant density
                h, w = plant_mask.shape
                
                # Find peaks in the plant mask
                # We'll use a simple approach: look for local maxima in small windows
                for y in range(0, h, grid_spacing):
                    for x in range(0, w, grid_spacing):
                        # Define window bounds
                        x_end = min(x + grid_spacing, w)
                        y_end = min(y + grid_spacing, h)
                        
                        # Extract window
                        window = plant_mask[y:y_end, x:x_end]
                        
                        # If we have vegetation in this window
                        if cv2.countNonZero(window) > self.min_plant_size:
                            # Find the center of mass of the vegetation in this window
                            y_indices, x_indices = np.where(window > 0)
                            if len(x_indices) > 0 and len(y_indices) > 0:
                                # Calculate center of mass
                                cx = int(np.mean(x_indices)) + x
                                cy = int(np.mean(y_indices)) + y
                                
                                # Add this as a plant location
                                plant_locations.append((cx, cy))
                                plant_sizes.append(typical_plant_size)  # Use typical size
                
                plant_count = len(plant_locations)
                
                # De-duplicate plants that are too close together
                if plant_count > 0:
                    # Convert to numpy array for vectorized operations
                    locations_array = np.array(plant_locations)
                    
                    # Calculate distances between all points
                    unique_locations = []
                    unique_sizes = []
                    
                    # Simple greedy clustering
                    remaining_indices = list(range(plant_count))
                    
                    while remaining_indices:
                        idx = remaining_indices.pop(0)
                        current_point = locations_array[idx]
                        unique_locations.append(tuple(current_point))
                        unique_sizes.append(plant_sizes[idx])
                        
                        # Remove points that are too close to the current point
                        to_remove = []
                        for j in remaining_indices:
                            other_point = locations_array[j]
                            distance = np.sqrt(np.sum((current_point - other_point) ** 2))
                            if distance < grid_spacing:
                                to_remove.append(j)
                        
                        # Remove these indices from consideration
                        for j in sorted(to_remove, reverse=True):
                            remaining_indices.remove(j)
                    
                    plant_locations = unique_locations
                    plant_sizes = unique_sizes
                    plant_count = len(plant_locations)
        
        else:
            # Original method: connected components approach
            num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(plant_mask)
            
            # Filter out small components (noise)
            plant_count = 0
            plant_locations = []
            plant_sizes = []
            
            # Start from 1 to skip background (label 0)
            for i in range(1, num_labels):
                area = stats[i, cv2.CC_STAT_AREA]
                if area >= self.min_plant_size:
                    plant_count += 1
                    x, y = centroids[i]
                    plant_locations.append((int(x), int(y)))
                    plant_sizes.append(area)
        
        # Draw circles at plant centers
        for i, (x, y) in enumerate(plant_locations):
            if len(plant_sizes) > i:
                # Calculate circle radius based on plant size
                radius = max(3, min(15, int(np.sqrt(plant_sizes[i] / np.pi))))
            else:
                radius = 5  # Default radius
                
            # Draw circle outline
            cv2.circle(count_viz, (x, y), radius, (255, 0, 0), 2)
            
            # Only add numbers if there are fewer than 100 plants (to avoid cluttering)
            if plant_count < 100:
                # Add plant number
                cv2.putText(
                    count_viz, 
                    str(i+1), 
                    (x-10, y-10), 
                    cv2.FONT_HERSHEY_SIMPLEX, 
                    0.5, 
                    (255, 255, 255), 
                    2
                )
        
        return count_viz, plant_count, plant_locations, plant_sizes
    
    def calculate_ndvi_approximation(self):
        """
        Calculate a rough approximation of NDVI using RGB channels
        Note: True NDVI requires NIR band, not available in RGB images
        """
        # Extract red and green channels
        red = self.rgb_image[:,:,0].astype(float)
        green = self.rgb_image[:,:,1].astype(float)
        
        # Pseudo-NDVI using red and green instead of NIR and red
        # This is just an approximation and nowhere near as accurate as true NDVI
        np.seterr(divide='ignore', invalid='ignore')
        pseudo_ndvi = (green - red) / (green + red + 1e-8)  # Add small value to prevent division by zero
        
        # Apply farm mask to limit analysis to the farm area
        if self.farm_mask is not None:
            # Create a float mask
            float_mask = self.farm_mask.astype(float) / 255.0
            
            # Apply mask to pseudo-NDVI
            pseudo_ndvi = pseudo_ndvi * float_mask
        
        # Normalize to 0-1 range
        pseudo_ndvi = np.clip(pseudo_ndvi, -1, 1)
        
        return pseudo_ndvi
    
    def analyze_image(self, image_path, output_dir=None, custom_border_colors=None):
        """
        Perform comprehensive analysis on a farm image
        
        Args:
            image_path: Path to the image file
            output_dir: Directory to save results (if None, results won't be saved)
            custom_border_colors: Optional list of tuples [(lower_rgb, upper_rgb), ...] for border detection
        """
        # Set custom border colors if provided
        if custom_border_colors:
            self.border_color_ranges = custom_border_colors
        
        # Load image
        self.load_image(image_path)
        
        # Create output directory if specified
        if output_dir:
            os.makedirs(output_dir, exist_ok=True)
        
        # Plant health analysis
        health_img, health_percentage, plant_mask = self.detect_plant_irregularities()
        
        # Soil analysis
        soil_img, avg_soil_color, soil_color_std, moisture_estimate, soil_mask = self.analyze_soil()
        
        # Calculate pseudo-NDVI
        pseudo_ndvi = self.calculate_ndvi_approximation()
        
        # Get vegetation coverage
        if self.farm_mask is not None:
            # Use the number of pixels in the farm mask
            farm_area_pixels = cv2.countNonZero(self.farm_mask)
        else:
            # Use the entire cropped image area
            farm_area_pixels = self.rgb_image.shape[0] * self.rgb_image.shape[1]
        
        # Calculate vegetation coverage percentage
        if farm_area_pixels > 0:
            vegetation_coverage = (cv2.countNonZero(plant_mask) / farm_area_pixels) * 100
        else:
            vegetation_coverage = 0
        
        # Prepare results dictionary
        results = {
            "plant_health_percentage": round(health_percentage, 2),
            "vegetation_coverage_percentage": round(vegetation_coverage, 2),
            "soil_color_rgb": avg_soil_color.tolist(),
            "soil_color_variation": soil_color_std.tolist(),
            "estimated_soil_moisture": round(moisture_estimate, 2),
        }
        
        # Visualize results
        plt.figure(figsize=(15, 10))
        
        # Original image
        plt.subplot(2, 2, 1)
        plt.title("Original Image")
        plt.imshow(self.rgb_image)
        plt.axis('off')
        
        # Plant health visualization
        plt.subplot(2, 2, 2)
        plt.title(f"Plant Health: {health_percentage:.1f}%")
        plt.imshow(health_img)
        plt.axis('off')
        
        # Soil analysis
        plt.subplot(2, 2, 3)
        plt.title(f"Soil Analysis (Est. Moisture: {moisture_estimate:.1f}%)")
        plt.imshow(soil_img)
        plt.axis('off')
        
        # Pseudo-NDVI
        plt.subplot(2, 2, 4)
        plt.title("Vegetation Index (Pseudo-NDVI)")
        plt.imshow(pseudo_ndvi, cmap='RdYlGn', vmin=-1, vmax=1)
        plt.colorbar(fraction=0.046, pad=0.04)
        plt.axis('off')
        
        plt.tight_layout()
        
        # Save or show results
        if output_dir:
            # Save visualization
            plt.savefig(os.path.join(output_dir, "analysis_results.png"), dpi=300)
            plt.close()
            
            # Save individual result images
            cv2.imwrite(os.path.join(output_dir, "plant_health.jpg"), 
                        cv2.cvtColor(health_img, cv2.COLOR_RGB2BGR))
            cv2.imwrite(os.path.join(output_dir, "soil_analysis.jpg"), 
                        cv2.cvtColor(soil_img, cv2.COLOR_RGB2BGR))
            
            # Save NDVI as colormap image
            plt.figure(figsize=(8, 6))
            plt.imshow(pseudo_ndvi, cmap='RdYlGn', vmin=-1, vmax=1)
            plt.colorbar(label='Pseudo-NDVI')
            plt.title('Vegetation Index')
            plt.axis('off')
            plt.savefig(os.path.join(output_dir, "vegetation_index.png"), dpi=300)
            plt.close()
            
            # Save original image with boundary overlay
            if self.crop_box is not None:
                # Create an overlay of the original image with the farm boundary highlighted
                overlay_img = self.original_rgb.copy()
                
                # If we have a farm mask, draw its outline on the original image
                if self.farm_mask is not None and self.crop_box is not None:
                    # Create a full-sized mask
                    full_mask = np.zeros((self.original_height, self.original_width), dtype=np.uint8)
                    x, y, w, h = self.crop_box
                    
                    # Place the cropped mask back into the full-sized mask
                    full_mask[y:y+h, x:x+w] = self.farm_mask
                    
                    # Find contours in the mask
                    contours, _ = cv2.findContours(full_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                    
                    # Draw the contours on the original image
                    cv2.drawContours(overlay_img, contours, -1, (0, 255, 0), 2)
                    
                    # Also draw the bounding box
                    cv2.rectangle(overlay_img, (x, y), (x+w, y+h), (255, 0, 0), 2)
                
                # Save the overlay image
                cv2.imwrite(os.path.join(output_dir, "farm_boundary.jpg"), 
                            cv2.cvtColor(overlay_img, cv2.COLOR_RGB2BGR))
            
            # Save results as text file
            with open(os.path.join(output_dir, "analysis_results.txt"), 'w') as f:
                f.write("Farm Image Analysis Results\n")
                f.write("==========================\n\n")
                f.write(f"Image: {os.path.basename(image_path)}\n")
                if self.crop_box:
                    x, y, w, h = self.crop_box
                    f.write(f"Farm area detected: x={x}, y={y}, width={w}, height={h}\n")
                f.write(f"Resolution: {self.rgb_image.shape[1]} x {self.rgb_image.shape[0]} pixels\n\n")
                
                f.write("Plant Health:\n")
                f.write(f"- Overall health: {health_percentage:.1f}%\n")
                f.write(f"- Vegetation coverage: {vegetation_coverage:.1f}%\n\n")
                
                f.write("Soil Analysis:\n")
                f.write(f"- Average soil color (RGB): {avg_soil_color}\n")
                f.write(f"- Soil color variation (RGB): {soil_color_std}\n")
                f.write(f"- Estimated soil moisture: {moisture_estimate:.1f}%\n")
        else:
            plt.show()
            
        return results
        
        # Calculate pseudo-NDVI
        pseudo_ndvi = self.calculate_ndvi_approximation()
        
        # Determine average plant size
        avg_plant_size = np.mean(plant_sizes) if plant_sizes else 0
        
        # Calculate cropped image area (for density calculations)
        if self.farm_mask is not None:
            # Use the number of pixels in the farm mask
            farm_area_pixels = cv2.countNonZero(self.farm_mask)
        else:
            # Use the entire cropped image area
            farm_area_pixels = self.rgb_image.shape[0] * self.rgb_image.shape[1]
        
        # Calculate plant density (plants per unit area)
        if farm_area_pixels > 0:
            plant_density = (plant_count / farm_area_pixels) * 1000000  # Plants per million pixels
        else:
            plant_density = 0
        
        # Calculate vegetation coverage percentage
        if farm_area_pixels > 0:
            vegetation_coverage = (cv2.countNonZero(plant_mask) / farm_area_pixels) * 100
        else:
            vegetation_coverage = 0
        
        # Prepare results dictionary
        results = {
            "plant_health_percentage": round(health_percentage, 2),
            "plant_count": plant_count,
            "avg_plant_size_pixels": round(avg_plant_size, 2),
            "plant_density_per_million_pixels": round(plant_density, 2),
            "vegetation_coverage_percentage": round(vegetation_coverage, 2),
            "soil_color_rgb": avg_soil_color.tolist(),
            "soil_color_variation": soil_color_std.tolist(),
            "estimated_soil_moisture": round(moisture_estimate, 2),
        }
        
        # Visualize results
        plt.figure(figsize=(15, 10))
        
        # Original image
        plt.subplot(2, 3, 1)
        plt.title("Original Image")
        plt.imshow(self.rgb_image)
        plt.axis('off')
        
        # Plant health visualization
        plt.subplot(2, 3, 2)
        plt.title(f"Plant Health: {health_percentage:.1f}%")
        plt.imshow(health_img)
        plt.axis('off')
        
        # Soil analysis
        plt.subplot(2, 3, 3)
        plt.title(f"Soil Analysis (Est. Moisture: {moisture_estimate:.1f}%)")
        plt.imshow(soil_img)
        plt.axis('off')
        
        # Plant count
        plt.subplot(2, 3, 4)
        plt.title(f"Plant Count: {plant_count}")
        plt.imshow(count_img)
        plt.axis('off')
        
        # Pseudo-NDVI
        plt.subplot(2, 3, 5)
        plt.title("Vegetation Index (Pseudo-NDVI)")
        plt.imshow(pseudo_ndvi, cmap='RdYlGn', vmin=-1, vmax=1)
        plt.colorbar(fraction=0.046, pad=0.04)
        plt.axis('off')
        
        # Farm mask
        plt.subplot(2, 3, 6)
        plt.title(f"Farm Boundary Mask")
        if self.farm_mask is not None:
            plt.imshow(self.farm_mask, cmap='gray')
        else:
            plt.imshow(np.ones_like(self.gray_image) * 255, cmap='gray')
        plt.axis('off')
        
        plt.tight_layout()
        
        # Save or show results
        if output_dir:
            # Save visualization
            plt.savefig(os.path.join(output_dir, "analysis_results.png"), dpi=300)
            plt.close()
            
            # Save individual result images
            cv2.imwrite(os.path.join(output_dir, "plant_health.jpg"), 
                        cv2.cvtColor(health_img, cv2.COLOR_RGB2BGR))
            cv2.imwrite(os.path.join(output_dir, "soil_analysis.jpg"), 
                        cv2.cvtColor(soil_img, cv2.COLOR_RGB2BGR))
            cv2.imwrite(os.path.join(output_dir, "plant_count.jpg"), 
                        cv2.cvtColor(count_img, cv2.COLOR_RGB2BGR))
            
            # Save NDVI as colormap image
            plt.figure(figsize=(8, 6))
            plt.imshow(pseudo_ndvi, cmap='RdYlGn', vmin=-1, vmax=1)
            plt.colorbar(label='Pseudo-NDVI')
            plt.title('Vegetation Index')
            plt.axis('off')
            plt.savefig(os.path.join(output_dir, "vegetation_index.png"), dpi=300)
            plt.close()
            
            # Save original image with boundary overlay
            if self.crop_box is not None:
                # Create an overlay of the original image with the farm boundary highlighted
                overlay_img = self.original_rgb.copy()
                
                # If we have a farm mask, draw its outline on the original image
                if self.farm_mask is not None and self.crop_box is not None:
                    # Create a full-sized mask
                    full_mask = np.zeros((self.original_height, self.original_width), dtype=np.uint8)
                    x, y, w, h = self.crop_box
                    
                    # Place the cropped mask back into the full-sized mask
                    full_mask[y:y+h, x:x+w] = self.farm_mask
                    
                    # Find contours in the mask
                    contours, _ = cv2.findContours(full_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                    
                    # Draw the contours on the original image
                    cv2.drawContours(overlay_img, contours, -1, (0, 255, 0), 2)
                    
                    # Also draw the bounding box
                    cv2.rectangle(overlay_img, (x, y), (x+w, y+h), (255, 0, 0), 2)
                
                # Save the overlay image
                cv2.imwrite(os.path.join(output_dir, "farm_boundary.jpg"), 
                            cv2.cvtColor(overlay_img, cv2.COLOR_RGB2BGR))
            
            # Save results as text file
            with open(os.path.join(output_dir, "analysis_results.txt"), 'w') as f:
                f.write("Farm Image Analysis Results\n")
                f.write("==========================\n\n")
                f.write(f"Image: {os.path.basename(image_path)}\n")
                if self.crop_box:
                    x, y, w, h = self.crop_box
                    f.write(f"Farm area detected: x={x}, y={y}, width={w}, height={h}\n")
                f.write(f"Resolution: {self.rgb_image.shape[1]} x {self.rgb_image.shape[0]} pixels\n\n")
                
                f.write("Plant Health:\n")
                f.write(f"- Overall health: {health_percentage:.1f}%\n")
                f.write(f"- Plant count: {plant_count}\n")
                f.write(f"- Average plant size: {avg_plant_size:.1f} pixels\n")
                f.write(f"- Plant density: {plant_density:.2f} plants per million pixels\n")
                f.write(f"- Vegetation coverage: {vegetation_coverage:.1f}%\n\n")
                
                f.write("Soil Analysis:\n")
                f.write(f"- Average soil color (RGB): {avg_soil_color}\n")
                f.write(f"- Soil color variation (RGB): {soil_color_std}\n")
                f.write(f"- Estimated soil moisture: {moisture_estimate:.1f}%\n")
        else:
            plt.show()
            
        return results


if __name__ == "__main__":
    # Set up command line argument parsing
    parser = argparse.ArgumentParser(description='Analyze farm images for plant health and soil conditions')
    parser.add_argument('image_path', help='Path to the farm image to analyze')
    parser.add_argument('--output', '-o', help='Directory to save results (optional)')
    parser.add_argument('--min-plant-size', type=int, default=10, 
                        help='Minimum size in pixels to be considered a plant (default: 10)')
    parser.add_argument('--no-border-detection', action='store_true',
                        help='Disable automatic farm boundary detection')
    parser.add_argument('--border-color', nargs=6, type=int, 
                        metavar=('R_LOW', 'G_LOW', 'B_LOW', 'R_HIGH', 'G_HIGH', 'B_HIGH'),
                        help='Custom border color range (RGB values 0-255)')
    parser.add_argument('--traditional-counting', action='store_true',
                        help='Use traditional connected-component plant counting instead of grid-based approach')
    parser.add_argument('--red-circle-detection', action='store_true',
                        help='Enable detection of red circles as plant markers')
    
    args = parser.parse_args()
    
    # Create analyzer
    analyzer = FarmImageAnalyzer()
    analyzer.min_plant_size = args.min_plant_size
    
    # Configure border detection
    if args.no_border_detection:
        analyzer.detect_border = False
    
    # Set custom border color if provided
    custom_border_colors = None
    if args.border_color:
        r_low, g_low, b_low, r_high, g_high, b_high = args.border_color
        custom_border_colors = [
            ([r_low, g_low, b_low], [r_high, g_high, b_high])
        ]
    
    # Determine plant counting method
    grid_based_counting = not args.traditional_counting
    
    # Configure red marker detection for aerial imagery
    if args.red_circle_detection:
        # Prioritize red circles as markers
        # This is handled within the count_plants method
        print("Red circle detection enabled for plant marking")
    
    # Run analysis
    try:
        results = analyzer.analyze_image(
            args.image_path, 
            args.output, 
            custom_border_colors
        )
        
        print("\nFarm Image Analysis Results:")
        print("-" * 30)
        print(f"Plant Health: {results['plant_health_percentage']}%")
        print(f"Vegetation Coverage: {results['vegetation_coverage_percentage']}%")
        print(f"Estimated Soil Moisture: {results['estimated_soil_moisture']}%")
        
        if args.output:
            print(f"\nDetailed results saved to: {args.output}")
    except Exception as e:
        print(f"Error analyzing image: {e}")
        import traceback
        traceback.print_exc()