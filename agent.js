import Anthropic from '@anthropic-ai/sdk'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') })

const args = process.argv.slice(2)
const fileFlag = args.indexOf('--file')
const storyFlag = args.indexOf('--story')

const userStory = fileFlag !== -1
  ? fs.readFileSync(args[fileFlag + 1], 'utf-8')
  : storyFlag !== -1
    ? args[storyFlag + 1]
    : (() => { console.error('Usage: node agent.js --story "<text>" | --file <path>'); process.exit(1) })()

const client = new Anthropic()

const prompt = `You are a senior QA engineer.
Read this user story and generate test cases, including edge cases and negative scenarios.
Return ONLY valid JSON starting with { and ending with }. No markdown, no backticks, no explanation.
Format: { "testCases": [ { "title": "string", "preconditions": "string", "steps": ["string"], "expectedResult": "string", "priority": "High" } ] }

USER STORY: ${userStory}`

const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 4000,
  messages: [{ role: 'user', content: prompt }],
})

const clean = response.content[0].text.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '')
const { testCases } = JSON.parse(clean)

console.log(`| ID | Title | Preconditions | Steps | Expected Result | Status |`)
console.log(`|---|---|---|---|---|---|`)
testCases.forEach((tc, i) => {
  const steps = tc.steps.map((s, idx) => `${idx + 1}. ${s}`).join('<br>')
  console.log(`| TC-AI-${i + 1} | ${tc.title} | ${tc.preconditions || '-'} | ${steps} | ${tc.expectedResult} | ⬜ |`)
})