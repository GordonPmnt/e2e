# Using arguments

The test runner leverage Regexp to accept argument.

To capture an argument, you need to specify a named group.

```
Then I can see "login" in the title
```

```typescript
(then as DefineStepFunction<{ needle: string }>)(
  /^I can see "(?<needle>\w+)" in the title$/,
  async ({ page }, { needle }) => {
    await expect(page.locator('h1')).toHaveText(needle);
  }
);
```
