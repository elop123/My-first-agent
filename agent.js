import Anthropic from '@anthropic-ai/sdk'
import 'dotenv/config'

const client = new Anthropic()

const myUserStory = `
  As a user I want to log in with email and password
  so that I can access my account.
  AC: Show error if password wrong. Lock after 5 attempts.
`

const prompt = `You are a senior QA engineer.
Read this user story and generate test cases.
Return ONLY valid JSON starting with { and ending with }.
No markdown. No backticks. No explanation.
Format: { "testCases": [ { "id": "TC-01", "title": "string", "steps": ["string"], "priority": "High" } ] }

USER STORY: ${myUserStory}`

const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 4000,
  messages: [{ role: 'user', content: prompt }]
})

const raw = response.content[0].text.trim()
const clean = raw.replace(/^```json\n?/, '').replace(/\n?```$/, '')
const result = JSON.parse(clean)

console.log(`\n✅ Generated ${result.testCases.length} test cases\n`)

result.testCases.forEach((tc, i) => {
  console.log(`TC-${i+1}: ${tc.title}`)
  console.log(`  Priority: ${tc.priority || 'not set'}`)
  tc.steps.forEach((step, s) => {
    console.log(`  Step ${s+1}: ${step}`)
  })
  console.log('')
})