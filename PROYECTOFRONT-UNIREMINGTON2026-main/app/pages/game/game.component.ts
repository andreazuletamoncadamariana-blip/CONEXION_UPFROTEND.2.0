import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;
  private spawnInterval: any;
  private timerInterval: any;

  // Estado del Juego
  score = 0;
  secondsElapsed = 0;
  isGameOver = true;
  baseEnemySpeed = 2; // Velocidad inicial

  // Entidades
  ship = { x: 280, y: 430, w: 40, h: 40, speed: 8 };
  bullets: any[] = [];
  enemies: any[] = [];
  keys: { [key: string]: boolean } = {};

  ngOnInit() {
    this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = 600;
    this.canvas.height = 500;
  }

  ngOnDestroy() { this.stopAllIntervals(); }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    this.keys[e.code] = true;
    if (e.code === 'Space' && !this.isGameOver) this.fire();
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(e: KeyboardEvent) { this.keys[e.code] = false; }

  startGame() {
    this.resetState();
    document.getElementById('overlay')?.classList.add('hidden');
    this.gameLoop();

    // Generar enemigos
    this.spawnInterval = setInterval(() => this.createEnemy(), 1000);

    // Cronómetro y dificultad
    this.timerInterval = setInterval(() => {
      this.secondsElapsed++;
      this.updateTimerUI();

      // Incrementar velocidad cada 10 segundos
      if (this.secondsElapsed % 10 === 0) {
        this.baseEnemySpeed += 0.5;
      }
    }, 1000);
  }

  resetState() {
    this.score = 0;
    this.secondsElapsed = 0;
    this.baseEnemySpeed = 2;
    this.isGameOver = false;
    this.enemies = [];
    this.bullets = [];
    this.updateScoreUI();
    this.updateTimerUI();
    this.ship.x = this.canvas.width / 2 - 20;
  }

  createEnemy() {
    if (this.isGameOver) return;
    this.enemies.push({
      x: Math.random() * (this.canvas.width - 30),
      y: -30,
      w: 30,
      h: 30,
      speed: this.baseEnemySpeed + Math.random()
    });
  }

  fire() {
    this.bullets.push({ x: this.ship.x + 18, y: this.ship.y, w: 4, h: 12 });
  }

  gameLoop() {
    if (this.isGameOver) return;
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // Movimiento
    if ((this.keys['ArrowLeft'] || this.keys['KeyA']) && this.ship.x > 0) this.ship.x -= this.ship.speed;
    if ((this.keys['ArrowRight'] || this.keys['KeyD']) && this.ship.x < this.canvas.width - this.ship.w) this.ship.x += this.ship.speed;

    // Balas
    this.bullets.forEach((b, i) => {
      b.y -= 10;
      if (b.y < 0) this.bullets.splice(i, 1);
    });

    // Enemigos y Colisiones
    this.enemies.forEach((e, i) => {
      e.y += e.speed;
      if (this.rectIntersect(this.ship, e)) this.endGame();

      this.bullets.forEach((b, bi) => {
        if (this.rectIntersect(b, e)) {
          this.enemies.splice(i, 1);
          this.bullets.splice(bi, 1);
          this.score += 100;
          this.updateScoreUI();
        }
      });
      if (e.y > this.canvas.height) this.enemies.splice(i, 1);
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Nave
    this.ctx.fillStyle = '#38bdf8';
    this.ctx.beginPath();
    this.ctx.moveTo(this.ship.x + 20, this.ship.y);
    this.ctx.lineTo(this.ship.x, this.ship.y + 40);
    this.ctx.lineTo(this.ship.x + 40, this.ship.y + 40);
    this.ctx.fill();
    // Balas
    this.ctx.fillStyle = '#fbbf24';
    this.bullets.forEach(b => this.ctx.fillRect(b.x, b.y, b.w, b.h));
    // Enemigos
    this.ctx.fillStyle = '#e30613';
    this.enemies.forEach(e => this.ctx.fillRect(e.x, e.y, e.w, e.h));
  }

  rectIntersect(r1: any, r2: any) {
    return !(r2.x > r1.x + r1.w || r2.x + r2.w < r1.x || r2.y > r1.y + r1.h || r2.y + r2.h < r1.y);
  }

  updateScoreUI() {
    const el = document.getElementById('score');
    if (el) el.innerText = this.score.toString().padStart(4, '0');
  }

  updateTimerUI() {
    const el = document.getElementById('timer');
    if (el) {
      const mins = Math.floor(this.secondsElapsed / 60).toString().padStart(2, '0');
      const secs = (this.secondsElapsed % 60).toString().padStart(2, '0');
      el.innerText = `${mins}:${secs}`;
    }
  }

  endGame() {
    this.isGameOver = true;
    this.stopAllIntervals();
    const title = document.getElementById('status-title');
    const desc = document.getElementById('status-desc');
    if (title) title.innerText = '¡MISIÓN FALLIDA!';
    if (desc) desc.innerText = `Puntos: ${this.score} | Tiempo: ${document.getElementById('timer')?.innerText}`;
    document.getElementById('overlay')?.classList.remove('hidden');
  }

  stopAllIntervals() {
    cancelAnimationFrame(this.animationId);
    clearInterval(this.spawnInterval);
    clearInterval(this.timerInterval);
  }
}
