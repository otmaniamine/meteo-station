const int ldrPin = 4; // LDR connected to GPIO2

void setup() {
  Serial.begin(9600); // Initialize serial communication
  pinMode(ldrPin, INPUT);
}

void loop() {
  int sensorValue = analogRead(ldrPin); 

  // Calculate percentage of luminosity
  float percentage = 100.0 - ((float)sensorValue / 4095.0) * 100.0; 
  percentage = constrain(percentage, 0.0, 100.0); // Ensure percentage is within 0-100 range

  // Print the percentage of luminosity to the serial monitor
  Serial.print("Luminosity: ");
  Serial.print(percentage);
  Serial.println("%");

  delay(300); // Delay for stability
}