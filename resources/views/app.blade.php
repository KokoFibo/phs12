<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <!-- PWA Support -->
    <link rel="manifest" href="{{ asset('manifest.json') }}">
    <meta name="theme-color" content="#4B5563">
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png">
    <meta name="apple-mobile-web-app-capable" content="yes">


    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @vite(['resources/js/app.ts'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
