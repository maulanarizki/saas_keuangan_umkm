<?php

namespace Application\User\DTO;

class UserData
{
    public function __construct(
        public readonly string $name,
        public readonly string $username,
        public readonly string $email,
        public readonly ?string $password = null,
        public readonly array $roles = []
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'],
            username: $data['username'],
            email: $data['email'],
            password: $data['password'] ?? null,
            roles: $data['roles'] ?? []
        );
    }
}
