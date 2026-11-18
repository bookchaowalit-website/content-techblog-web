import assert from 'node:assert/strict';
import { test } from 'node:test';
import { checkPosts, comparePosts, filterPosts, getAllPosts, getPost, normalizeTags, readingMinutes, stripLeadingTitle, tagCounts, validateFrontmatter } from '../src/lib/posts.ts';

const valid = { title: 'T', date: '2026-10-15', summary: 'S', excerpt: 'E', author: 'Book', tags: ['js'] };

test('normalizeTags accepts a list, a comma-separated string or nothing', () => {
  assert.deepEqual(normalizeTags(['a', ' b ']), ['a', 'b']);
  assert.deepEqual(normalizeTags('react, next ,, ts'), ['react', 'next', 'ts']);
  assert.deepEqual(normalizeTags(undefined), []);
  assert.deepEqual(normalizeTags(42), []);
});

test('readingMinutes rounds up at 200 words a minute and is at least one', () => {
  assert.equal(readingMinutes(''), 1);
  assert.equal(readingMinutes('word '.repeat(200)), 1);
  assert.equal(readingMinutes('word '.repeat(201)), 2);
});

test('validateFrontmatter names a missing title, a bad date and a missing excerpt', () => {
  assert.deepEqual(validateFrontmatter('p', valid), []);
  assert.deepEqual(validateFrontmatter('p', { ...valid, title: ' ', date: '2026-02-30', excerpt: undefined }), [
    'p: title is missing',
    'p: excerpt is missing',
    'p: date "2026-02-30" is not a valid YYYY-MM-DD date',
  ]);
});

test('checkPosts rejects slugs that collide once case is ignored', () => {
  assert.deepEqual(checkPosts([{ slug: 'a', ...valid }, { slug: 'b', ...valid }]), []);
  assert.deepEqual(checkPosts([{ slug: 'Intro', ...valid }, { slug: 'intro', ...valid }]), ['duplicate slug "intro"']);
});

test('the published posts are valid, newest first, and readable by slug', () => {
  const posts = getAllPosts();
  assert.ok(posts.length >= 5);
  assert.deepEqual(checkPosts(posts), []);
  for (let i = 1; i < posts.length; i++) assert.ok(comparePosts(posts[i - 1], posts[i]) <= 0);
  for (const post of posts) {
    const full = getPost(post.slug);
    assert.equal(full.title, post.title);
    assert.ok(full.content.length > 1500);
    assert.ok(full.readingMinutes >= 1);
  }
  assert.equal(getPost('../package'), null);
  assert.equal(getPost('missing-post'), null);
});

test('posts sort newest first, then by title, so the order never depends on file names', () => {
  const a = { date: '2026-10-15', title: 'Beta', slug: 'b' };
  const b = { date: '2026-10-15', title: 'alpha', slug: 'a' };
  const c = { date: '2026-11-01', title: 'Zed', slug: 'z' };
  const d = { date: '2026-10-15', title: 'ALPHA', slug: 'a2' };
  assert.deepEqual([a, d, b, c].sort(comparePosts).map((p) => p.slug), ['z', 'a', 'a2', 'b']);
  assert.equal(comparePosts(b, { ...b }), 0);
});

test('filterPosts narrows by tag and by every word of a query over title, summary and tags', () => {
  const posts = [
    { title: 'Fetch contracts', summary: 'HTTP status and payload', excerpt: '', tags: ['fetch', 'http'] },
    { title: 'Timers', summary: 'Pure transitions', excerpt: '', tags: ['testing'] },
  ];
  assert.deepEqual(filterPosts(posts, {}).length, 2);
  assert.deepEqual(filterPosts(posts, { q: 'http STATUS' }).map((p) => p.title), ['Fetch contracts']);
  assert.deepEqual(filterPosts(posts, { q: 'testing' }).map((p) => p.title), ['Timers']);
  assert.deepEqual(filterPosts(posts, { tag: 'http' }).map((p) => p.title), ['Fetch contracts']);
  assert.deepEqual(filterPosts(posts, { tag: 'http', q: 'timers' }), []);
});

test('tagCounts lists each tag once, most used first, then by name', () => {
  assert.deepEqual(tagCounts([{ tags: ['b', 'a', 'a'] }, { tags: ['a', 'c'] }]), [{ tag: 'a', count: 2 }, { tag: 'b', count: 1 }, { tag: 'c', count: 1 }]);
});

test('stripLeadingTitle drops a first-line h1 that repeats the page title, and nothing else', () => {
  assert.equal(stripLeadingTitle('\n# Same title\n\nBody', 'Same title'), 'Body');
  assert.equal(stripLeadingTitle('# Same title\n\n  - one\n  - two', 'Same title'), '  - one\n  - two');
  assert.equal(stripLeadingTitle('# Same title\r\n\r\n    code', 'Same title'), '    code');
  assert.equal(stripLeadingTitle('# Other\n\nBody', 'Same title'), '# Other\n\nBody');
  assert.equal(stripLeadingTitle('Intro\n# Same title', 'Same title'), 'Intro\n# Same title');
});
