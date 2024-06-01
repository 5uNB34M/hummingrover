hummingbird.startHummingbird()

music.stringPlayable("", 120)

basic.showLeds(`
# . . . #
. # # # .
. # . # .
# # # # #
. # # # .
`)

let battery: number
battery = hummingbird.getBattery()

if (battery < 926){
    basic.showString("LOW BATTERY")
}

if (battery > 4630){
    yellowLED()
}

hummingbird.setTriLED(TwoPort.One, 100, 100, 100)
hummingbird.setTriLED(TwoPort.Two, 100, 100, 100)

let distance: number
distance = hummingbird.getSensor(SensorType.Distance, ThreePort.One)

function greenLED() { 
    hummingbird.setLED(ThreePort.Three, 100)
}


function yellowLED(){
    hummingbird.setLED(ThreePort.Two, 100)
}

function redLED(){
    hummingbird.setLED(ThreePort.One, 100)
}

function moveF(){
    hummingbird.setRotationServo(FourPort.One, 100)
    hummingbird.setRotationServo(FourPort.Four, 100)
}

function moveB(){
    hummingbird.setRotationServo(FourPort.One, -100)
    hummingbird.setRotationServo(FourPort.Four, -100)
}

function turnR(){
    hummingbird.setRotationServo(FourPort.One, 100)
    hummingbird.setRotationServo(FourPort.Four, 0)
}

function turnL(){
    hummingbird.setRotationServo(FourPort.One, 0)
    hummingbird.setRotationServo(FourPort.Four, 100)
}

function stop() {
    hummingbird.setRotationServo(FourPort.One, 0)
    hummingbird.setRotationServo(FourPort.Four, 0)
}

basic.forever(function() {
    const distance = hummingbird.getSensor(SensorType.Distance, ThreePort.One)

    while (distance >= 37) {
        greenLED()
        moveF()
    }

    while (distance < 30) {
        moveB()
    }

    if (distance == 20) {
        redLED()
        stop()
    }

    if (distance < 37) {
        greenLED()
        // Choose a direction to turn; you might want to alternate or add logic here
        if (Math.random() > 0.5) {
            turnL()
        } else {
            turnR()
        }
    }

})