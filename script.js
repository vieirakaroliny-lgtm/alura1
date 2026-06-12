// Cores originais da Monalisa de Leonardo da Vinci
const COLORS = {
    skin: '#D4AF8D',
    skinShadow: '#A67C52',
    hairDark: '#3D2817',
    hairLight: '#5D4037',
    background: '#7B6D5D',
    backgroundLight: '#8B7355',
    lips: '#C1440A',
    eyeWhite: '#F5F5DC',
    eyeIris: '#6B4423',
    eyePupil: '#1A1410',
    eyebrow: '#4A3728',
    clothDark: '#1A1410',
    clothLight: '#3D2817'
};

// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 800;

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// Event listeners para rastrear movimento do mouse
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener('mouseleave', () => {
    mouseX = canvas.width / 2;
    mouseY = canvas.height / 2;
});

// Função para desenhar a arte
function desenharMonalisa() {
    // Limpar canvas
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar fundo com gradiente
    const gradientFundo = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradientFundo.addColorStop(0, COLORS.background);
    gradientFundo.addColorStop(1, COLORS.backgroundLight);
    ctx.fillStyle = gradientFundo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar montanhas ao fundo (paisagem)
    ctx.fillStyle = '#6B5D4F';
    ctx.beginPath();
    ctx.moveTo(0, 400);
    ctx.bezierCurveTo(100, 300, 200, 350, 300, 300);
    ctx.bezierCurveTo(400, 250, 500, 320, 600, 280);
    ctx.lineTo(600, 800);
    ctx.lineTo(0, 800);
    ctx.fill();

    // Desenhar rio ao fundo
    ctx.fillStyle = '#5B7C99';
    ctx.beginPath();
    ctx.moveTo(200, 450);
    ctx.bezierCurveTo(300, 480, 400, 420, 500, 500);
    ctx.lineTo(550, 600);
    ctx.lineTo(100, 600);
    ctx.fill();

    // Desenhar cabeça (rosto)
    const cX = canvas.width / 2;
    const cY = canvas.height / 2 - 50;
    
    // Pescoço
    ctx.fillStyle = COLORS.skin;
    ctx.beginPath();
    ctx.ellipse(cX, cY + 120, 35, 60, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rosto principal
    ctx.fillStyle = COLORS.skin;
    ctx.beginPath();
    ctx.ellipse(cX, cY, 90, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sombra no rosto (lado esquerdo)
    ctx.fillStyle = COLORS.skinShadow;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(cX - 70, cY, 40, 80, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Desenhar cabelo
    ctx.fillStyle = COLORS.hairDark;
    ctx.beginPath();
    ctx.ellipse(cX, cY - 30, 95, 100, 0, 0, Math.PI);
    ctx.fill();

    // Detalhes do cabelo
    ctx.strokeStyle = COLORS.hairLight;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cX - 80, cY - 50);
    ctx.quadraticCurveTo(cX - 60, cY - 80, cX - 40, cY - 70);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cX + 40, cY - 70);
    ctx.quadraticCurveTo(cX + 60, cY - 80, cX + 80, cY - 50);
    ctx.stroke();

    // Desenhar olhos com interatividade
    desenharOlho(cX - 40, cY - 20, mouseX, mouseY);
    desenharOlho(cX + 40, cY - 20, mouseX, mouseY);

    // Desenhar sobrancelhas
    ctx.strokeStyle = COLORS.eyebrow;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    
    // Sobrancelha esquerda
    ctx.beginPath();
    ctx.moveTo(cX - 60, cY - 35);
    ctx.quadraticCurveTo(cX - 40, cY - 45, cX - 20, cY - 35);
    ctx.stroke();

    // Sobrancelha direita
    ctx.beginPath();
    ctx.moveTo(cX + 20, cY - 35);
    ctx.quadraticCurveTo(cX + 40, cY - 45, cX + 60, cY - 35);
    ctx.stroke();

    // Desenhar nariz
    ctx.strokeStyle = COLORS.skinShadow;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cX, cY + 5);
    ctx.lineTo(cX, cY + 35);
    ctx.stroke();

    // Desenhar boca (sorriso da Monalisa)
    ctx.strokeStyle = COLORS.lips;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cX - 35, cY + 60);
    ctx.quadraticCurveTo(cX, cY + 75, cX + 35, cY + 60);
    ctx.stroke();

    // Desenhar roupas
    ctx.fillStyle = COLORS.clothDark;
    ctx.beginPath();
    ctx.moveTo(cX - 100, cY + 110);
    ctx.lineTo(cX - 120, cY + 250);
    ctx.lineTo(cX + 120, cY + 250);
    ctx.lineTo(cX + 100, cY + 110);
    ctx.fill();

    // Detalhes das roupas
    ctx.strokeStyle = COLORS.clothLight;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(cX - 90, cY + 130);
    ctx.quadraticCurveTo(cX, cY + 140, cX + 90, cY + 130);
    ctx.stroke();
    ctx.globalAlpha = 1.0;

    // Desenhar mãos
    desenharMao(cX - 110, cY + 180);
    desenharMao(cX + 110, cY + 180);
}

// Função para desenhar olho com movimento
function desenharOlho(x, y, targetX, targetY) {
    // Branco do olho
    ctx.fillStyle = COLORS.eyeWhite;
    ctx.beginPath();
    ctx.ellipse(x, y, 20, 28, 0, 0, Math.PI * 2);
    ctx.fill();

    // Calcular ângulo para a pupila seguir o mouse
    const dx = targetX - x;
    const dy = targetY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    // Iris
    const irisOffset = 8;
    const irisX = x + Math.cos(angle) * irisOffset;
    const irisY = y + Math.sin(angle) * irisOffset;

    ctx.fillStyle = COLORS.eyeIris;
    ctx.beginPath();
    ctx.arc(irisX, irisY, 12, 0, Math.PI * 2);
    ctx.fill();

    // Pupila
    ctx.fillStyle = COLORS.eyePupil;
    ctx.beginPath();
    ctx.arc(irisX, irisY, 7, 0, Math.PI * 2);
    ctx.fill();

    // Brilho nos olhos
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(irisX - 3, irisY - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Contorno do olho
    ctx.strokeStyle = COLORS.eyebrow;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(x, y, 20, 28, 0, 0, Math.PI * 2);
    ctx.stroke();
}

// Função para desenhar mão
function desenharMao(x, y) {
    ctx.fillStyle = COLORS.skin;
    ctx.beginPath();
    ctx.ellipse(x, y, 25, 40, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Dedos
    const dedos = [
        { x: x - 15, y: y - 35, rx: 6, ry: 15 },
        { x: x - 5, y: y - 40, rx: 6, ry: 18 },
        { x: x + 5, y: y - 40, rx: 6, ry: 18 },
        { x: x + 15, y: y - 35, rx: 6, ry: 15 }
    ];

    dedos.forEach(dedo => {
        ctx.beginPath();
        ctx.ellipse(dedo.x, dedo.y, dedo.rx, dedo.ry, 0, 0, Math.PI * 2);
        ctx.fill();
    });

    // Sombra nas mãos
    ctx.fillStyle = COLORS.skinShadow;
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.ellipse(x + 10, y + 10, 20, 30, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
}

// Função de animação
function animar() {
    desenharMonalisa();
    requestAnimationFrame(animar);
}

// Iniciar animação
animar();
