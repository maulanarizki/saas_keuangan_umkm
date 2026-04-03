<?php

namespace Application\Role\DTO;

class RoleData
{
    public function __construct(
        public readonly string $name,
        public readonly array $permissions = []
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'],
            permissions: $data['permissions'] ?? []
        );
    }
}
