<?php
// Файлы phpmailer
require './php-mailer/PHPMailer.php';
require './php-mailer/SMTP.php';
require './php-mailer/Exception.php';
require './config.php';


use PHPMailer\PHPMailer\PHPMailer;

header('Content-type: application/json');



function tfprintMailer($host, $username, $password, $add_address)
{
    $input = json_decode(file_get_contents("php://input"), true);
    // Переменные, которые отправляет пользователь
    $email = $input['email'];
    $name = $input['name'];
    $phone_number = $input['phone'];
    $productName = $input['productName'];
    $amount = $input['amount'];
    $size = $input['size'];
    $text = 'Здравствуйте, меня зовут '.$name.', я оставил(а) заявку на сайте http://saratov-tfprint.ru/';

    // Формирование самого письма
    $title = "Письмо от посетителя saratov-tfprint.ru";
    $body = "
            <b>Почта: </b> $email<br><br>
            <b>Номер телефона: </b> +$phone_number<br><br>
            <b>Сообщение: </b>$text<br><br>
            <b>Наименование: </b>$productName<br><br>
            <b>Количество товара: </b>$amount<br><br>
            <b>Размер: </b>$size<br><br>
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
       $mail->Host       = $host; // SMTP сервера вашей почты
        $mail->Username   = $username; // Логин на почте
        $mail->Password   = $password; // Пароль на почте
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom($host, $name); // Адрес самой почты и имя отправителя

        // Получатель письма
        $mail->addAddress($add_address);



        // Отправка сообщения
        $mail->isHTML(true);
        $mail->Subject = $title;
        $mail->Body = $body;

        // Проверяем отравленность сообщения
        if ($mail->send()) {
            $result = 'Успешно отправленно!';
            $status_code = '200';
            echo(json_encode(['result' => $result, 'status_code' => $status_code]));
        } else {
            $result = 'Сообщение не было отправлено. Ошибка сервера';
            $status_code = '500';
            echo(json_encode(['result' => $result, 'status_code' => $status_code]));
        }
    } catch (Exception $e) {
        $result = "error";
    }
}

tfprintMailer($host, $username, $password, $add_address);
