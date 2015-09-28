<?php
  //openlog("cfwebui.log", LOG_PID | LOG_PERROR, LOG_LOCAL0);
  if (!function_exists('getallheaders')) {
    function getallheaders() {
      error_log ( "IN: \n",3,"/app/php/var/log/webui.log");
      $headers = '';
      foreach ($_SERVER as $name => $value) {
        error_log ( "$name : $value \n",3,"/app/php/var/log/webui.log");
        if (substr($name, 0, 5) == 'HTTP_') {
          $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
        }

        if ($name == 'CONTENT_TYPE') {
          $headers['Content-Type'] = $value;
        }

        if ($name == 'CONTENT_LENGTH') {
          $headers['Content-Length'] = $value;
        }
      }
      return $headers;
    }
  }

  $method = $_SERVER['REQUEST_METHOD'];
  $url = null;
  $data = null;
  $urlEncoded = false;

  // get data from the request
  if ($method == 'GET') {
    $data = $_GET;
  } else { // POST, PUT, DELETE
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
  }

  // get url to request
  $url = (isset($data['url']) && !empty($data['url'])) ? $data['url'] : null;

  if ($url != null) {
    unset($data['url']);

    // get http headers from the request and prepare it for curl
    $headersFromRequest = getallheaders();
    $headersForCurl = array();
    foreach ($headersFromRequest as $key => $value) {
      if ($key == 'X-Webui-Authorization') {
          $headersForCurl[] = 'Authorization' . ': ' . $value;
      }
      if ($key == 'Accept' || $key == 'Authorization' || $key == 'Content-Type') {
          $headersForCurl[] = $key . ': ' . $value;
      }

      if ($key == 'Content-Type' && strrpos($value, 'application/x-www-form-urlencoded') !== false) {
        $urlEncoded = true;
      }
    }

    // prepare data for request
    if ($urlEncoded) {
      $data = http_build_query($data);
    } else {
      $data = json_encode($data);
    }
    error_log ( "url: $url \n",3,"/app/php/var/log/webui.log");
    error_log ( "Data: $data \n",3,"/app/php/var/log/webui.log");
    error_log ( "Header_IN:  " . $output = implode(', ', array_map(function ($v, $k) { return $k . '=' . $v; }, $headersFromRequest, array_keys($headersFromRequest))) . "\n",3,"/app/php/var/log/webui.log");
    error_log ( "Header_OUT: " . implode(', ', array_map(function ($v, $k) { return $k . '=' . $v; }, $headersForCurl, array_keys($headersForCurl))) . "\n",3,"/app/php/var/log/webui.log");

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_VERBOSE, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Curl');

    switch ($method) {
      case 'GET':

        break;

      case 'POST':
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        break;

      case 'PUT':
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        break;
        
      case 'DELETE':
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        break;
    }

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headersForCurl);
    curl_setopt($ch, CURLOPT_HEADER, true);

    // Send the request & save response to $resp
    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        print "Error: " . curl_error($ch);
    } else {
        // get the response
        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = substr($response, 0, $header_size);
        $body = substr($response, $header_size);
error_log ( "Header-size: $header_size \n",3,"/app/php/var/log/webui.log");
error_log ( "Header: $header \n",3,"/app/php/var/log/webui.log");
error_log ( "Body: $body \n",3,"/app/php/var/log/webui.log");
        // create http header
        $lines = explode(PHP_EOL, $header);
        foreach($lines as $line) {
          header($line);
        }

        echo $body;
        curl_close($ch);
    }
  }
  //closelog("cfwebui.log");
?>