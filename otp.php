<?php

function generateOTP(string $sercet_key, int $time_step = 60, int $length = 6): string
{
    $counter = floor(time() / $time_step);
    $data = pack("NN", 0, $counter);
    $hash = hash_hmac('sha1', $data, $sercet_key, true);
    $offset = ord(substr($hash, -1)) & 0x0F;
    $value = unpack("N", substr($hash, $offset, 4));
    $otp = ($value[1] & 0x7FFFFFFF) % pow(10, $length);

    return str_pad(strval($otp), $length, '0', STR_PAD_LEFT);
}

//echo generateOTP("123");