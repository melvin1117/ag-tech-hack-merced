#!/usr/bin/env python3
"""
Test script to verify Letta API connectivity
Place this in your backend directory and run it manually to test
"""

import os
import sys
import json
import httpx
import argparse

def test_letta_api(api_key, agent_id, message="Hello from test script"):
    """Test direct connection to Letta API"""
    
    print(f"Testing Letta API with agent_id: {agent_id}")
    print(f"API Key (first 5 chars): {api_key[:5]}***")
    
    base_url = "https://api.letta.com"
    
    # Headers according to docs
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    # Payload according to docs
    payload = {
        "content": message
    }
    
    try:
        print("\n1. Testing connection to Letta API...")
        with httpx.Client(timeout=30.0) as client:
            response = client.post(
                f"{base_url}/agents/{agent_id}/messages",
                json=payload,
                headers=headers
            )
        
        print(f"Status code: {response.status_code}")
        print(f"Response headers: {dict(response.headers)}")
        
        # Print a truncated version of the response content
        content_preview = response.text[:500] + "..." if len(response.text) > 500 else response.text
        print(f"Response content: {content_preview}")
        
        # If the response is JSON, let's parse and pretty print it
        try:
            json_response = response.json()
            print("\nParsed JSON response:")
            print(json.dumps(json_response, indent=2))
        except Exception as e:
            print(f"Response is not valid JSON: {e}")
            
        # Test listing messages
        print("\n2. Testing getting message history...")
        with httpx.Client(timeout=30.0) as client:
            list_response = client.get(
                f"{base_url}/agents/{agent_id}/messages",
                headers=headers
            )
            
        print(f"Status code: {list_response.status_code}")
        
        # If the response is JSON, let's parse and pretty print it
        try:
            list_json = list_response.json()
            message_count = len(list_json)
            print(f"Found {message_count} messages")
            if message_count > 0:
                print("First message:")
                print(json.dumps(list_json[0], indent=2))
        except Exception as e:
            print(f"Response is not valid JSON: {e}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Test Letta API connectivity")
    parser.add_argument("--key", help="Letta API key")
    parser.add_argument("--agent", help="Letta agent ID")
    parser.add_argument("--message", default="Hello from test script", help="Message to send")
    
    args = parser.parse_args()
    
    api_key = args.key or os.environ.get("LETTA_API_KEY")
    agent_id = args.agent or os.environ.get("LETTA_AGENT_ID")
    
    if not api_key:
        print("Error: No API key provided. Use --key or set LETTA_API_KEY environment variable.")
        sys.exit(1)
        
    if not agent_id:
        print("Error: No agent ID provided. Use --agent or set LETTA_AGENT_ID environment variable.")
        sys.exit(1)
    
    test_letta_api(api_key, agent_id, args.message)