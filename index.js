import {
  Ball,
  ball_collision,
  update_v,
  top_screen_collision,
  down_screen_collision,
  left_screen_collision,
  right_screen_collision,
  rotate,
} from "./Ball.js";
import { Vector } from "./Vector.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let balls = [];
let n, id;

function animation() {
  requestAnimationFrame(animation);

  for (let i = 0; i < n; i++) {
    balls[i].update_position();
  }

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (ball_collision(balls[i], balls[j])) {
        /* CodePen */
        let res = new Vector(
          balls[i].v.x - balls[j].v.x,
          balls[i].v.y - balls[j].v.y
        );

        if (
          res.x * (balls[j].x - balls[i].x) +
            res.y * (balls[j].y - balls[i].y) >=
          0
        ) {
          let m1 = balls[i].m;
          let m2 = balls[j].m;
          let theta = -Math.atan2(
            balls[j].y - balls[i].y,
            balls[j].x - balls[i].x
          );
          let v1 = rotate(balls[i].v, theta);
          let v2 = rotate(balls[j].v, theta);

          console.log(v1.x, v1.y, v2.x, m1, m2);

          let u1 = new Vector(
            (v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2),
            v1.y
          );

          console.log(u1);

          u1 = rotate(u1, -theta);
          let u2 = new Vector(
            (v2.x * (m2 - m1)) / (m1 + m2) + (v1.x * 2 * m1) / (m1 + m2),
            v2.y
          );
          u2 = rotate(u2, -theta);

          balls[i].v.x = u1.x;
          balls[i].v.y = u1.y;
          balls[j].v.x = u2.x;
          balls[j].v.y = u2.y;
        }
      }

      if (balls[i].x - balls[i].r <= 0) {
        balls[i].x = balls[i].r;
      }

      if (balls[i].x + balls[i].r >= canvas.width) {
        balls[i].x = canvas.width - balls[i].r;
      }

      if (
        (balls[i].x - balls[i].r <= 0 && balls[i].v.x < 0) ||
        (balls[i].x + balls[i].r >= canvas.width && balls[i].v.x > 0)
      ) {
        balls[i].v.x *= -1;
      }

      if (balls[i].y - balls[i].r <= 0) {
        balls[i].y = balls[i].r;
      }

      if (balls[i].y + balls[i].r >= canvas.height) {
        balls[i].y = canvas.height - balls[i].r;
      }

      if (
        (balls[i].y - balls[i].r <= 0 && balls[i].v.y < 0) ||
        (balls[i].y + balls[i].r >= canvas.height && balls[i].v.y > 0)
      ) {
        balls[i].v.y *= -1;
      }

      if (balls[j].x - balls[j].r <= 0) {
        balls[j].x = balls[j].r;
      }

      if (balls[j].x + balls[j].r >= canvas.width) {
        balls[j].x = canvas.width - balls[j].r;
      }

      if (
        (balls[j].x - balls[j].r <= 0 && balls[j].v.x < 0) ||
        (balls[j].x + balls[j].r >= canvas.width && balls[j].v.x > 0)
      ) {
        balls[j].v.x *= -1;
      }

      if (balls[j].y - balls[j].r <= 0) {
        balls[j].y = balls[j].r;
      }

      if (balls[j].y + balls[j].r >= canvas.height) {
        balls[j].y = canvas.height - balls[j].r;
      }

      if (
        (balls[j].y - balls[j].r <= 0 && balls[j].v.y < 0) ||
        (balls[j].y + balls[j].r >= canvas.height && balls[j].v.y > 0)
      ) {
        balls[j].v.y *= -1;
      }

      /*let v1 = new Vector(balls[i].v.x, ball_1.v.y);
let v2 = new Vector(ball_2.v.x, ball_2.v.y);
let m1 = ball_1.m;
let m2 = ball_2.m;
let c1 = new Vector(ball_1.x, ball_1.y);
let c2 = new Vector(ball_2.x, ball_2.y);
update_v(ball_1, ball_2, v1, v2, m1, m2, c1, c2);*/

      //console.log(ball_1.v, ball_2.v);

      /*if (top_screen_collision(ball_1)) {
ball_1.v.y *= -1;
ball_1.y = ball_1.r;
}

if (down_screen_collision(ball_1)) {
ball_1.v.y *= -1;
ball_1.y = canvas.height - ball_1.r;
}

if (left_screen_collision(ball_1)) {
ball_1.v.x *= -1;
ball_1.x = ball_1.r;
}

if (right_screen_collision(ball_1)) {
ball_1.v.x *= -1;
ball_1.x = canvas.width - ball_1.r;
}

if (top_screen_collision(ball_2)) {
ball_2.v.y *= -1;
ball_2.y = ball_2.r;
}

if (down_screen_collision(ball_2)) {
ball_2.v.y *= -1;
ball_2.y = canvas.height - ball_2.r;
}

if (left_screen_collision(ball_2)) {
ball_2.v.x *= -1;
ball_2.x = ball_2.r;
}

if (right_screen_collision(ball_2)) {
ball_2.v.x *= -1;
ball_2.x = canvas.width - ball_2.r;
}*/

      clear_canvas();

      for (let k = 0; k < n; k++) {
        balls[k].draw();
      }
    }
  }
}

function clear_canvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/*let ball_1 = new Ball(100, 100, 5, 0, 20);
let ball_2 = new Ball(500, 100, 0, 0, 10);

ball_1.draw();
ball_2.draw();*/

document.getElementById("db").addEventListener("change", () => {
  balls = [];
  n = Math.floor(Math.random() * 20) + 2;

  for (let i = 0; i < n; i++) {
    let random_x = Math.floor(Math.random() * (canvas.width - 100)) + 50;
    let random_y = Math.floor(Math.random() * (canvas.height - 100)) + 50;
    let random_m = Math.floor(Math.random() * 25) + 1;
    let random_v_x = Math.floor(Math.random() * 7) + 1;
    let random_v_y = Math.floor(Math.random() * 7) + 1;

    balls.push(new Ball(random_x, random_y, random_v_x, random_v_y, random_m));

    requestAnimationFrame(animation);
  }
});
