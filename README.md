# M00SIE-GEN: Account Stuff Generator

_It makes Email Addresses, Passwords, Passphrases and tells you something nice_

**Current Version:** 1.0.0 (in development)

The purpose of this small CLI tool is to interactively generate usable email addresses, passwords and/or passphrases for use in creating accounts for testing applications, APIs or because it amuses you! I wanted to learn JS and Node.js better, so I made this project. Turns out it's pretty handy for making large batches of Postman credentials.

## Email Generator

The Email Address generator accepts a current email address as inpuut and will append a numbering system after the + sign in order for the emails to still reach your inbox.

`<yourusername> + MM.DD.YYYY-i @ youremail.domain`

## Password Generator

Generates randomized passwords of _n_ length, which defaults to 5 chars and maxes out at 50 chars.
You can specify the following inclusions:

- Uppercase Characters
- Lowercase Characters
- Special Characters
