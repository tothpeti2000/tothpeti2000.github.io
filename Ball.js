import { Vector } from "./Vector.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export class Ball {
  constructor(x, y, v_x, v_y, m) {
    this.x = x;
    this.y = y;
    this.v = new Vector(v_x, v_y);
    this.m = m;
    this.r = 2 * m;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  update_position() {
    this.x += this.v.x;
    this.y += this.v.y;
  }
}

export function ball_collision(ball_1, ball_2) {
  let d = Math.sqrt(
    Math.pow(ball_2.x - ball_1.x, 2) + Math.pow(ball_2.y - ball_1.y, 2)
  );

  return d <= ball_1.r + ball_2.r;
}

export function update_v(ball_1, ball_2, v1, v2, m1, m2, c1, c2) {
  /*let e1 = new Vector((x2 - x1) / d, (y2 - y1) / d);
  let e2 = new Vector((y1 - y2) / d, (x2 - x1) / d);

  console.log(e1, e2);

  let mc_v = new Ball(
    (v1x * m1 + v2x * m2) / (m1 + m2),
    (v1y * m1 + v2y * m2) / (m1 + m2)
  );

  let v1_prime = new Vector(v1x - mc_vx, v1y - mc_vy);
  let v2_prime = new Vector(v2x - mc_vx, v2y - mc_vy);

  let v1_e1 = new Vector(
    (v1x_prime * e1.x + v1y_prime * e1.y) * e1.x,
    (v1x_prime * e1.x + v1y_prime * e1.y) * e1.y
  );
  let v1_e2 = new Vector(v1x_prime - v1_e1.x, v1y_prime - v1_e1.y);
  let v2_e1 = new Vector(
    (v2x_prime * e1.x + v2y_prime * e1.y) * e1.x,
    (v2x_prime * e1.x + v2y_prime * e1.y) * e1.y
  );
  let v2_e2 = new Vector(v2x_prime - v2_e1.x, v2y_prime - v2_e1.y);

  v1_e1.x *= -1;
  v1_e1.y *= -1;
  v2_e1.x *= -1;
  v2_e1.y *= -1;

  ball_1.v.x = v1_e1.x + v1_e2.x;
  ball_1.v.y = v1_e1.y + v1_e2.y;

  ball_2.v.x = v2_e1.x + v2_e2.x;
  ball_2.v.y = v2_e1.y + v2_e2.y;

  ball_1.v.x += mc_vx;
  ball_1.v.y += mc_vy;

  ball_2.v.x += mc_vx;
  ball_2.v.y += mc_vy;*/

  let e = new Vector(1, 0);

  let a = new Vector(c2.x - c1.x, c2.y - c1.y);

  console.log("a: ", a);

  console.log(v1, v2);

  let theta_1 = angle(v1, e);
  let theta_2 = angle(v2, e);
  let phi = Math.acos(a.x / v_length(a));

  console.log("Theta_1: ", theta_1);
  console.log("Theta_2: ", theta_2);
  console.log("Phi:", phi);

  let temp_v1 = new Vector(v1.x, v1.y);
  let temp_v2 = new Vector(v2.x, v2.y);

  ball_1.v.x =
    ((v_length(temp_v1) * Math.cos(theta_1 - phi) * (m1 - m2) +
      2 * m2 * v_length(temp_v2) * Math.cos(theta_2 - phi)) /
      (m1 + m2)) *
      Math.cos(phi) +
    v_length(temp_v1) * Math.sin(theta_1 - phi) * Math.cos(phi + Math.PI / 2);

  ball_1.v.y =
    ((v_length(temp_v1) * Math.cos(theta_1 - phi) * (m1 - m2) +
      2 * m2 * v_length(temp_v2) * Math.cos(theta_2 - phi)) /
      (m1 + m2)) *
      Math.sin(phi) +
    v_length(temp_v1) * Math.sin(theta_1 - phi) * Math.sin(phi + Math.PI / 2);

  ball_2.v.x =
    ((v_length(temp_v2) * Math.cos(theta_2 - phi) * (m2 - m1) +
      2 * m1 * v_length(temp_v1) * Math.cos(theta_1 - phi)) /
      (m1 + m2)) *
      Math.cos(phi) +
    v_length(temp_v2) * Math.sin(theta_2 - phi) * Math.cos(phi + Math.PI / 2);

  ball_2.v.y =
    ((v_length(temp_v2) * Math.cos(theta_2 - phi) * (m2 - m1) +
      2 * m1 * v_length(temp_v1) * Math.cos(theta_1 - phi)) /
      (m1 + m2)) *
      Math.sin(phi) +
    v_length(temp_v2) * Math.sin(theta_2 - phi) * Math.sin(phi + Math.PI / 2);

  console.log(ball_1.v, ball_2.v);
}

function v_length(v) {
  return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
}

function angle(a, b) {
  if ((a.x == 0 && a.y == 0) || (b.x == 0 && b.y == 0)) {
    return 0;
  }
  return Math.acos((a.x * b.x + a.y * b.y) / (v_length(a) * v_length(b)));
}

export function top_screen_collision(ball) {
  return ball.y - ball.r <= 0;
}

export function down_screen_collision(ball) {
  return ball.y + ball.r >= canvas.height;
}

export function left_screen_collision(ball) {
  return ball.x - ball.r <= 0;
}

export function right_screen_collision(ball) {
  return ball.x + ball.r >= canvas.width;
}

export function rotate(v, theta) {
  let v_rotated = new Vector(
    v.x * Math.cos(theta) - v.y * Math.sin(theta),
    v.x * Math.sin(theta) + v.y * Math.cos(theta)
  );

  return v_rotated;
}
