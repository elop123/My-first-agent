# QA Test Case Generation Agent 🤖

An AI agent that reads a user story and automatically generates
a complete set of test cases — including steps, edge cases, and negative scenarios.

No more writing boilerplate test cases manually.

## What it does

- Input: a user story with acceptance criteria
- Output: structured test cases with step-by-step instructions
- High Productivity: speeds up the workflow by creating comprehensive test coverage, eliminating hours of manual writing.

## Example

Input:
As a buyer I want to add products to my shopping cart
so that I can purchase multiple items in one order.

Output:
TC-01: Add to cart button visible on every product card
  Step 1: Navigate to the product listing page
  Step 2: Verify each product card has an Add to Cart button
  Step 3: Confirm button is visible for in-stock items

TC-02: Out of stock products cannot be added
  Step 1: Find a product marked as out of stock
  Step 2: Verify Add to Cart button is disabled
  Step 3: Confirm cart remains unchanged

## Tech stack

- Node.js
- Anthropic Claude API (claude-sonnet-4-6)

## How to run it yourself

1. Clone this repo
   git clone https://github.com/elop123/My-first-agent.git

2. Install dependencies
   npm install

3. Create a .env file and add your Anthropic API key
   ANTHROPIC_API_KEY=your-key-here

4. Paste your user story into agent.js

5. Run it
   node agent.js

## What I learned

- How to call the Anthropic API from Node.js
- How to write prompts that return structured JSON
- How AI agents work: input → prompt → output
- How to parse and display AI responses in the terminal

