<?php
// Файлы phpmailer
require '../php-mailer/PHPMailer.php';
require '../php-mailer/SMTP.php';
require '../php-mailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

header('Content-type: application/json');

// while(true) {
//     sleep(5);
//     echo('ki');
// }

function tfprintMailer()
{
    // Переменные, которые отправляет пользователь
    $email = 'kirillsemichuk@yandex.ru';
    $text = 'Я люблю Маму';

    // Формирование самого письма
    $title = "Тестовое письмо для tfprint";
    $body = "
            <b>Почта:</b> $email<br><br>
            <b>Сообщение:</b><br>$text
            ";

    // Настройки PHPMailer
    $mail = new PHPMailer();
    try {
        $mail->isSMTP();
        $mail->CharSet = "UTF-8";
        $mail->SMTPAuth   = true;
        //$mail->SMTPDebug = 2;
        $mail->Debugoutput = function ($str, $level) {
            $GLOBALS['status'][] = $str;
        };

        // Настройки вашей почты
        $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
        $mail->Username   = ''; // Логин на почте
        $mail->Password   = ''; // Пароль на почте
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom('', 'tfprint mailer'); // Адрес самой почты и имя отправителя

        // Получатель письма
        $mail->addAddress('');
        // $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен


        // Отправка сообщения
        $mail->isHTML(true);
        $mail->Subject = $title;
        $mail->Body = $body;

        // Проверяем отравленность сообщения
        if ($mail->send()) {
            $result = "success";
            echo ('success');
        } else {
            $result = "error";
            $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
            echo ($status);
        }
    } catch (Exception $e) {
        $result = "error";
    }
    // echo json_encode(["result" => $result, "status" => $status]);
}

echo(json_encode($_POST));