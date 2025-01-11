const int hallPinEast = 22;   // Pin connected to Hall effect sensor for East , org 
const int hallPinNorth = 15;  // Pin connected to Hall effect sensor for North , move
const int hallPinWest = 18;  // Pin connected to Hall effect sensor for West,gris
const int hallPinSouth = 21; // Pin connected to Hall effect sensor for South,marron-blue

void setup() {
  Serial.begin(9600);
  pinMode(hallPinEast, INPUT_PULLUP);
  pinMode(hallPinNorth, INPUT_PULLUP);
  pinMode(hallPinWest, INPUT_PULLUP);
  pinMode(hallPinSouth, INPUT_PULLUP);
}

void loop() {
  int eastState = !digitalRead(hallPinEast);
  int northState = !digitalRead(hallPinNorth);
  int westState = !digitalRead(hallPinWest);
  int southState = !digitalRead(hallPinSouth);
  if (eastState && northState) {
    Serial.println("N-E");
  }
  else if (eastState && southState) {
    Serial.println("S-E");
  }
  else if (southState && westState) {
    Serial.println("S-W");
  }
  else if (westState && northState) {
    Serial.println("N-W");
  }
  else if (eastState) {
    Serial.println("Direction: East");
  }
  else if (westState) {
    Serial.println("Direction: West");
  }
  else if (southState) {
    Serial.println("Direction: South");
  }
  else if (northState) {
    Serial.println("Direction: North");
  }
  else {Serial.println("0");}
  Serial.println("-------------------------------------------------");

  delay(400); // Check every 100ms
}