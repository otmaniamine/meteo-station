// Pin connected to the Hall effect sensor
const int hallPin = 13;

// Constants
const float vaneDiameter = 0.29; // Diameter of the vane in meters (29 cm)
const float vaneCircumference = vaneDiameter * 3.1415; // Circumference in meters
const float anemometerFactor = 2.5; // Efficiency factor

// Variables
volatile int rotationCount = 0; // Counter for rotations
unsigned long startTime = 0;    // Start time for measuring period

// Interrupt Service Routine for counting rotations
void countRotation() {
  rotationCount++;
}

void setup() {
  Serial.begin(9600);
  
  // Configure the Hall effect sensor pin
  pinMode(hallPin, INPUT_PULLUP);
  
  // Attach interrupt to count rotations
  attachInterrupt(digitalPinToInterrupt(hallPin), countRotation, RISING); // Trigger on rising edge (when magnet is present)
  
  // Initialize the start time
  startTime = millis();
}

void loop() {
  // Measure for 10-second intervals
  unsigned long currentTime = millis();
  if (currentTime - startTime >= 10000) {
    // Calculate rotations per second
    float rotationsPerSecond = rotationCount / 10.0;

    // Calculate wind speed in meters per second
    float windSpeed = rotationsPerSecond * vaneCircumference * anemometerFactor;

    // Print results
    Serial.print("Rotations: ");
    Serial.print(rotationCount);
    Serial.print(", Rotations/sec: ");
    Serial.print(rotationsPerSecond);
    Serial.print(", Wind Speed: ");
    Serial.print(windSpeed);
    Serial.println(" m/s");

    // Reset for the next measurement period
    rotationCount = 0;
    startTime = currentTime;
  }
}
