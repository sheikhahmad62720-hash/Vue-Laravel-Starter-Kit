<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ExampleFormTest extends TestCase
{
    public function test_the_example_form_page_is_rendered(): void
    {
        $this->get(route('example-form.create'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('ExampleForm'));
    }

    public function test_a_valid_submission_redirects_with_a_success_message(): void
    {
        $response = $this->from(route('example-form.create'))->post(route('example-form.store'), [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'subject' => 'Hello from the starter kit',
        ]);

        $response
            ->assertRedirect(route('example-form.create'))
            ->assertSessionHas('success', 'Thanks, Ada Lovelace. Your message passed validation.');

        $this->followRedirects($response)
            ->assertInertia(fn (Assert $page) => $page
                ->where('flash.success', 'Thanks, Ada Lovelace. Your message passed validation.')
            );
    }

    public function test_invalid_submissions_return_validation_errors(): void
    {
        $response = $this->from(route('example-form.create'))->post(route('example-form.store'), [
            'name' => '',
            'email' => 'not-an-email',
            'subject' => '',
        ]);

        $response
            ->assertRedirect(route('example-form.create'))
            ->assertSessionHasErrors(['name', 'email', 'subject']);
    }

    public function test_the_name_must_be_at_least_two_characters(): void
    {
        $this->from(route('example-form.create'))
            ->post(route('example-form.store'), [
                'name' => 'A',
                'email' => 'ada@example.com',
                'subject' => 'Hello',
            ])
            ->assertSessionHasErrors('name');
    }

    public function test_the_email_must_be_a_valid_address(): void
    {
        $this->from(route('example-form.create'))
            ->post(route('example-form.store'), [
                'name' => 'Ada Lovelace',
                'email' => 'not-an-email',
                'subject' => 'Hello',
            ])
            ->assertSessionHasErrors('email');
    }
}
