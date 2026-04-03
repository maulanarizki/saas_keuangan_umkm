<?php

namespace Application\Permission\DTO;

class PermissionData
{
    public function __construct(
        public readonly string $name
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name']
        );
    }
}
