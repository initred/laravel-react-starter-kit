<?php

declare(strict_types=1);

test('terms page is accessible', function (): void {
    $this->get(route('docs.terms'))->assertOk();
});

test('terms page contains content', function (): void {
    $response = $this->get(route('docs.terms'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('docs/terms')
        ->has('content')
    );
});

test('privacy page is accessible', function (): void {
    $this->get(route('docs.privacy'))->assertOk();
});

test('privacy page contains content', function (): void {
    $response = $this->get(route('docs.privacy'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('docs/privacy')
        ->has('content')
    );
});
