<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\PlaceholderUser;

class ImportPlaceholderUsers extends Command
{
    protected $signature = 'import:placeholder-users';
    protected $description = 'Import users from jsonplaceholder.typicode.com';

    public function handle()
    {
        $response = Http::get('https://jsonplaceholder.typicode.com/users');

        if ($response->successful()) {
            $users = $response->json();

            foreach ($users as $user) {
                PlaceholderUser::updateOrCreate(
                    ['id' => $user['id']],
                    [
                        'name' => $user['name'],
                        'username' => $user['username'],
                        'email' => $user['email'],
                        'phone' => $user['phone'] ?? null,
                        'website' => $user['website'] ?? null,
                    ]
                );
            }

            $this->info('Users imported successfully!');
        } else {
            $this->error('Failed to fetch users.');
        }

        $dummyResponse = Http::get('https://dummyjson.com/users');

        if ($dummyResponse->successful()) {
            $dummyUsers = $dummyResponse->json()['users'];
        
            foreach ($dummyUsers as $user) {
                PlaceholderUser::updateOrCreate(
                    ['email' => $user['email']],
                    [
                        'username'    => $user['username'],
                        'email'       => $user['email'],
                        'phone'       => $user['phone'] ?? null,
                        'website'     => null, 
                        'first_name'  => $user['firstName'],
                        'last_name'   => $user['lastName'],
                        'name'        => $user['firstName'] . ' ' . $user['lastName'],
                        'maiden_name' => $user['maidenName'] ?? null,
                        'age'         => $user['age'] ?? null,
                        'gender'      => $user['gender'] ?? null,
                        'birth_date'  => $user['birthDate'] ?? null,
                    ]
                );
            }
            }
        }
}