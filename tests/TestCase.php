<?php

declare(strict_types=1);

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Laravel\Fortify\Features;

abstract class TestCase extends BaseTestCase
{
    /**
     * Skip the test unless the given Fortify feature is enabled.
     */
    protected function skipUnlessFortifyHas(string $feature): void
    {
        if (! Features::enabled($feature)) {
            $this->markTestSkipped(sprintf('Fortify feature [%s] is not enabled.', $feature));
        }
    }
}
