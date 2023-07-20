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

# TODO

_This project is a work in progress, below is a #todo list_

## Complete emailGenerator function(s)

- Add ability to write out email addresses to CSV
- Add ability to write out email addresses + same passwords to 1 CSV
- Add error handling

## Hook passphraseGenerator to mongodb

- Refactor logic to reflect lookup of words in mongodb based on letter index, instead of a large literal object
- Look into manged Mongo Atlas cluster, if not a locally deployed cluster.

## Add the funny "Tell me something nice" feature

- Consume a public API or set up simple REST API to tell you something nice (GET, returns an object with 1 property per request)
- If rolling own API w/ Express, decide on the best way to host said API
- Something funny might happen if you hit this 5 or 10 times in a row...

## Create a User Interface

- Find balance between CLI args and interactive prompting (Or give options to use both)
- Interface should ideally allow interoperability between parts of the app, but may be implemented in a simpler fashion to start with
- Style parts of Interface w/ **chalk** and **gradient-string**. Because pretty is good.
