
// game_started = false

var bg_img_1 = new Image()
bg_img_1.src = './assets/background game fiap/Nature Background/Nature Background Raw.png'

var enemy_img = new Image() // --> SPRITE INIMIGOS
enemy_img.src = './assets/Tilemap/characters_packed.png'

var utils_imgs = new Image() // --> SPRITE ÍCONES
utils_imgs.src = './assets/Tilemap/tiles.png'
var utils_imgs_b = new Image() // --> SPRITE ÍCONES B
utils_imgs_b.src = './assets/assets_b/Tilemap/tiles.png'

var robot_imgs = new Image() // --> SPRITE ROBO
robot_imgs.src = './assets/ROBO2.png'


// ######################################## ATRIBUTOS INICIAIS -->
var canvas = {
    width: 800,
    height: 600
};
var player = {
    x: 30,
    y: (canvas.height/2)-150,
    height: 20,
    width: 20,
    score:0,
    max_life:4
};
var keys = {
    right: false,
    left: false,
    up: false,
    down: false,
    space: false
};

// ######################################## INIMIGOS -->
enemies = [];
var enemyWidth = 20;
var enemyHeight = 20;
var enemyVel = 0.3;
var counter_enemies = 0;
var spawn_now = false;
var enemy_type = 1;
var enemy_score = 10;
var enemy_max_life = 1;

function spawn_status_change(){
    spawn_now = true
};
function spawnEnemy(enm_range){

    console.log('Novo Inimigo' + enm_range)

    var max = (canvas.height/2) + 120
    var min = (canvas.height/2) - 140
    
    let difference = max - min;
    let rand = Math.random();

    rand = Math.floor(rand * difference);
    rand = rand + min;

    if (enm_range>0.8){
        enemy_score = 20;
        enemy_max_life = 2;
        enemy_type = 2;
    };

    enemies.push({
        xPosition: 280,
        yPosition: rand,
        height: enemyHeight,
        width: enemyWidth,
        e_score: enemy_score,
        e_life: enemy_max_life,
        e_type: enemy_type,
        e_open_legs: false
    });

    enemy_type = 1;
    enemy_score = 10;
    enemy_max_life = 1;
    counter_enemies += 1
};
function change_legs(){
    for(i=0; i < counter_enemies; i++){
        if(enemies[i].e_open_legs){
            enemies[i].e_open_legs = false
        } else {
            enemies[i].e_open_legs = true
        }
    }
};
// ######################################## PROJÉTEIS -->
projectiles = [];
var projWidth = 10;
var projHeight = 3;
var projVel = 1;
var counter_projectiles = 0;
var max_ammo = 4;
var proj_fill = 'red';

var ammo = [];
var has_ammo = true;
var ammoWidth = 5;
var ammoHeight = 5;
var ammo_fill = 'blue';
var counter_ammo = 0;

var max_energy_height = 30;
var energy_width = 10;
var energy_color = "yellow";

function spawnProj(e){


    if(e.keyCode == 32){
        console.log('PewPew!');
        console.log(max_ammo)

        if(max_ammo > 0){
            projectiles.push({
                xPosition: player.x+player.width,
                yPosition: player.y + 13,
                height: projHeight,
                width: projWidth
            })
            counter_projectiles += 1;
            max_ammo -= 1;
        } else {
            has_ammo = false
        }
    }
};
function spawnAmmo(pos_x,pos_y){
    ammo.push({
        xPosition: pos_x,
        yPosition: pos_y,
        width: ammoWidth,
        height: ammoHeight
    })
};

// ######################################## RENDERIZAÇÕES -->
function rendercanvas(){
    // ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg_img_1,0,0,1280,720,0,0,300,300);

}
function rendercanvas2(img){
    // ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img,0,0,1280,720,0,0,300,300);

}
function renderplayer(){
    ctx.drawImage(robot_imgs,0,0,862,582, player.x, player.y, 45, 45);
}
function renderenemy(){
    for(i = 0; i < counter_enemies; i++){


        enemy_x = enemies[i].xPosition
        enemy_y = enemies[i].yPosition

        enemy_open_legs = enemies[i].e_open_legs

        // VERIFICA O TIPO DE INIMIGO E RENDERIZA CONFORME -->
        if(enemies[i].e_type == 1){
            if(enemy_open_legs) {
                ctx.drawImage(enemy_img,25,0,22,25, enemy_x, enemy_y, enemies[i].width, enemies[i].height);
                enemies[i].xPosition -= enemyVel;
            } else {
                ctx.drawImage(enemy_img,0,0,22,25, enemy_x, enemy_y, enemies[i].width, enemies[i].height);
                enemies[i].xPosition -= enemyVel;
            }
        }

        if(enemies[i].e_type == 2){
            if(enemy_open_legs){
                ctx.drawImage(enemy_img,75,0,22,25, enemy_x, enemy_y, enemies[i].width, enemies[i].height);
                enemies[i].xPosition -= enemyVel;
            } else {
                ctx.drawImage(enemy_img,50,0,22,25, enemy_x, enemy_y, enemies[i].width, enemies[i].height);
                enemies[i].xPosition -= enemyVel;
            }
        }

    }
}
function render_proj(){
    for(i = 0; i < counter_projectiles; i++){
        ctx.fillStyle = proj_fill;
        proj_x = projectiles[i].xPosition;
        proj_y = projectiles[i].yPosition;
        ctx.fillRect(proj_x, proj_y, projectiles[i].width, projectiles[i].height);
        projectiles[i].xPosition += projVel;
    }
}
function render_ammo(){
    for(i = 0; i < counter_ammo; i++){
        ammo_x = ammo[i].xPosition;
        ammo_y = ammo[i].yPosition;
        ctx.drawImage(utils_imgs,140,60,18,18, ammo_x, ammo_y, 20, 20);
    }
}
function render_expl(px,py){
    for(i = 0; i<player.max_life; i++){
        ctx.drawImage(utils_imgs_b,102,0,15,15, px, py, 20, 20);
    }

};


function render_life(){
    for(i = 0; i<player.max_life; i++){
        ctx.drawImage(utils_imgs,80,40,20,20, 10+(i*20), 10, 20, 20);
    }

};
function render_energy(){

    square_heigth = max_energy_height/max_ammo

    for(i=0;i<max_ammo;i++){

        rel_heigth_start = (square_heigth*i)+13
        // rel_heigth_end = (rel_heigth_start+square_heigth)*0.9
        ctx.fillStyle = energy_color
        ctx.fillRect(90,rel_heigth_start,10,square_heigth*0.9)
    }
}
function render_score(){
    ctx.font = "10px Consolas";
    ctx.fillStyle = "white";
    ctx.fillText("Pontos: "+player.score, 10, 40);
}
function render_status_bg(){
    ctx.fillStyle = "black"
    ctx.fillRect(5,5,100,45)
}


function render_new_game(){
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,300,300)

    ctx.fillStyle = "white"
    ctx.fillText("Novo Jogo!",200,200)
}

function render_game_over(){
    
    
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,300,300)

    ctx.fillStyle = "white"
    ctx.fillText("Game Over!",130,200)
    ctx.font = "8px Consolas"
    ctx.fillText("PONTOS -- " + player.score,130,220)
    ctx.fillText("Clique na tela para reiniciar" ,130,250)


}



// ######################################## colisoes -->

function check_colision(){

    player_end_x = (player.x+player.width);
    player_end_y = (player.y+player.height);

    // COLISÕES COM INIMIGOS -->
    for(i = 0; i < counter_enemies; i++){
        enemy_x = enemies[i].xPosition;
        enemy_y = enemies[i].yPosition;
        enemy_end_x = (enemy_x+enemyWidth);
        enemy_end_y = (enemy_y+enemyHeight);

        // CHECK: PLAYER ACERTOU O INIMIGO
        if(
            (enemy_x <= player_end_x+10 && enemy_end_x >= player.x &&
            enemy_y <= player_end_y+10 && enemy_end_y >= player.y)
        ){
            enemies.splice(i,1);
            counter_enemies -= 1;
            player.max_life -= 1;
        };

        // CHECK: INIMIGO ACERTOU A BORDA
        if(enemy_x <= -20){
            enemies.splice(i,1);
            counter_enemies -= 1;
        };


        for(j = 0; j < counter_projectiles; j++){

            proj_x = projectiles[j].xPosition;
            proj_y = projectiles[j].yPosition;
            proj_end_x = (proj_x+projWidth);
            proj_end_y = (proj_y+projHeight);

            // CHECK: TIRO ACERTOU O INIMIGO
            if(
                (enemy_x <= proj_end_x && enemy_end_x >= proj_x &&
                enemy_y <= proj_end_y && enemy_end_y >= proj_y)
            ){
                enemies[i].e_life -= 1;
                projectiles.splice(j,1);
                counter_projectiles -= 1;
                if(enemies[i].e_life==0){
                    player.score += enemies[i].e_score
                    enemies.splice(i,1);
                    counter_enemies -= 1;
                    counter_ammo += 1;
                    spawnAmmo((enemy_x+5),(enemy_y+5));
                    render_expl(enemy_x,enemy_y)
                    console.log(player.score)
                }
            };

            // CHECK: TIRO ACERTOU A PAREDE ++
            if(proj_x >= 400){
                projectiles.splice(j,1);
                counter_projectiles -= 1;
            }

        } 


    }

    // COLISÕES COM MUNIÇÃO -->
    for(i = 0; i < counter_ammo; i++){
        ammo_x = ammo[i].xPosition;
        ammo_y = ammo[i].yPosition;
        ammo_end_x = (ammo_x+ammoWidth);
        ammo_end_y = (ammo_y+ammoHeight);

        if(
            (ammo_x <= player_end_x+10 && ammo_end_x >= player.x &&
            ammo_y <= player_end_y+10 && ammo_end_y >= player.y) 
        ){
            ammo.splice(i,1);
            max_ammo += 2;
            counter_ammo -= 1;
        }

    }
}

// ######################################## KEY LISTENERS -->

function keydown(e) {
    if(e.keyCode == 37) {
        keys.left = true;
    }
    if(e.keyCode == 38) {
        keys.up = true;
    }
    if(e.keyCode == 39) {
        keys.right = true;
    }
    if(e.keyCode == 40) {
        keys.down = true;
    }
};
function keyup(e) {
    if(e.keyCode == 37) {
        keys.left = false;
    }
    if(e.keyCode == 38) {
        keys.up = false;
    }
    if(e.keyCode == 39) {
        keys.right = false;
    }
    if(e.keyCode == 40) {
        keys.down = false;
    }
};
function mousedown(){
    window.game_started = true
}

// ######################################## MAIN LOOP -->

var game_over = false
function loop() {

    game_over = false

    if(keys.up) {
        if (player.y > 0) {
            player.y -= 2.5;
        }
    }
    if(keys.down){
        if(player.y < 280){
            player.y += 2.5;
        }
    }
    if(keys.left) {
        if(player.x > 0){
            player.x -= 2.5;
        }
    }
    if(keys.right) {
        if(player.x < 280){
            player.x += 2.5;
        }
    }

    rendercanvas();
    renderplayer();
    check_colision();
    renderenemy();
    render_proj();
    render_ammo();

    render_status_bg();
    render_life();
    render_score();
    render_energy();
    

    if (spawn_now){
        var enm_range = Math.random();
        spawnEnemy(enm_range);
        spawn_now = false
    }

    if(player.max_life > 0){
        requestAnimationFrame(loop);
    } else {
        render_game_over()
        game_over = true
    }


}

// ######################################## INICIAR -->
var intervalInMilliSeconds = 2000
var game_started = false

canvas=document.getElementById("canvas1");
ctx=canvas.getContext("2d");
ctx.canvas.height = canvas.width;
ctx.canvas.width = canvas.height;
// Adding the event listeners
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);
document.addEventListener("keypress", spawnProj)

document.body.onmousedown = function(){
    if(game_over){
        enemies = [];
        counter_enemies = 0;
        spawn_now = false;
        projectiles = [];
        counter_projectiles = 0;
        max_ammo = 4;
        ammo = [];
        has_ammo = true;
        counter_ammo = 0;
        player = {
            x: 30,
            y: 150,
            height: 20,
            width: 20,
            score:0,
            max_life:4
        };
        requestAnimationFrame(loop)
    }
}

setInterval(spawn_status_change, intervalInMilliSeconds);
setInterval(change_legs, 2000);
requestAnimationFrame(loop);