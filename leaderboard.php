<?php
header('Content-Type: application/json; charset=utf-8');

// ===================================================================
// ISI 4 BARIS INI SESUAI DATABASE KAMU DI cPANEL -> MySQL Databases
// ===================================================================
$DB_HOST = 'localhost';
$DB_NAME = 'kuroeygr_awawa';     // nama database, biasanya diawali namauser_
$DB_USER = 'kuroeygr_awawa';       // username database
$DB_PASS = 'benjolrokiM123';
// ===================================================================

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'db_connect_failed']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

// ---------- GET: ambil top 20 leaderboard ----------
if ($method === 'GET') {
    $stmt = $pdo->query("SELECT name, count FROM kuru_leaderboard ORDER BY count DESC LIMIT 20");
    $rows = $stmt->fetchAll();
    echo json_encode(['entries' => $rows]);
    exit;
}

// ---------- POST: submit / update skor ----------
if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    $deviceId = isset($data['device_id'])
        ? substr(preg_replace('/[^a-zA-Z0-9_]/', '', (string)$data['device_id']), 0, 40)
        : '';
    $name = isset($data['name']) ? trim(substr((string)$data['name'], 0, 16)) : '';
    $count = isset($data['count']) ? (int)$data['count'] : -1;

    if ($deviceId === '' || $name === '' || $count < 0) {
        http_response_code(400);
        echo json_encode(['error' => 'invalid_input']);
        exit;
    }

    // cek data lama buat device ini
    $stmt = $pdo->prepare("SELECT count FROM kuru_leaderboard WHERE device_id = ?");
    $stmt->execute([$deviceId]);
    $existing = $stmt->fetch();

    if ($existing) {
        // anti-cheat sederhana: skor tidak boleh turun drastis (lompat besar dicurigai)
        $prev = (int)$existing['count'];
        if ($count < $prev) {
            $count = $prev;
        } elseif ($count - $prev > 200) {
            // batasi lonjakan per request, biar gak langsung loncat ribuan dalam 1 panggilan
            $count = $prev + 200;
        }
        $stmt = $pdo->prepare("UPDATE kuru_leaderboard SET name = ?, count = ?, updated_at = NOW() WHERE device_id = ?");
        $stmt->execute([$name, $count, $deviceId]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO kuru_leaderboard (device_id, name, count, updated_at) VALUES (?, ?, ?, NOW())");
        $stmt->execute([$deviceId, $name, $count]);
    }

    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'method_not_allowed']);
