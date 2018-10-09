class Particle {
    constructor(pos, vel) {
        this.pos = pos;
        this.vel = vel;
        this.acc = createVector(0, 0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc.x, this.acc.y);
        this.pos.add(this.vel.x, this.vel.y);
        this.acc = createVector(0, 0);
    }

    show() {
        point(this.pos.x, this.pos.y);
    }
}

class Explosion {
    constructor(x, y, size, hue) {
        this.size = constrain(size, 1, 10);
        this.particles = [];
        for (let i = 0; i < size * 10; i++) {
            let pos = createVector(x, y);
            let vel = createVector(random(-size/2, size/2), random(-size/2, size/2));
            this.particles.push(new Particle(pos, vel));
        }
        this.hue = constrain(hue, 0, 100);
        this.alpha = 100;
    }

    onComplete(func) {
        this.completionFunction = func;
    }

    applyForce(force) {
        this.particles.forEach(p => {
            p.applyForce(force);
        });
    }

    update() {
        this.particles.forEach(p => {
            p.update();
        });
        this.alpha--;
        if (this.alpha <= 0 && this.completionFunction) {
            this.completionFunction();
        }
    }

    show() {
        push();
        strokeWeight(this.size);
        colorMode(HSB, 100, 100, 100, 100);
        stroke(this.hue, 100, 100, this.alpha);
        this.particles.forEach(p => {
            p.show();
        });
        pop();
    }
}

class Firework extends Particle {

    constructor() {
        super();
        this.reset();
    }

    reset() {
        this.pos = createVector(random(0, width), random(height, height * 2));
        this.vel = createVector(random(-1, 1), random(-8, -5));
        this.acc = createVector(0, 0);
        this.size = random(2, 6);
        this.oldPos = null;
    }

    applyForce(force) {
        super.applyForce(force);
    };

    update() {
        this.oldPos = this.pos.copy();
        super.update();
        if (this.vel.y >= 0) {
            this.explode();
        }
    }

    onExplode(func) {
        this.createExplosion = func;
    }

    explode() {
        if (this.createExplosion) {
            this.createExplosion(this.pos.x, this.pos.y, this.size / 2);
        }
        this.reset();
    }

    show() {
        push();
        colorMode(HSB, 100, 100, 100);
        stroke(16, 100, 100);
        if (this.oldPos) {
            strokeWeight(this.size / 4);
            line(this.oldPos.x, this.oldPos.y, this.pos.x, this.pos.y);
        }
        super.show();
        pop();
    }

}