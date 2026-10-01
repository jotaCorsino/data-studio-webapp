<?php

declare(strict_types=1);

namespace Technolife\DataStudio\Instance\Tests;

use PHPUnit\Framework\TestCase;
use Technolife\DataStudio\Instance\Kernel;

final class KernelSmokeTest extends TestCase
{
    public function testKernelCanBeCreated(): void
    {
        $kernel = new Kernel('test', true);

        self::assertSame('test', $kernel->getEnvironment());
        self::assertTrue($kernel->isDebug());
    }
}
