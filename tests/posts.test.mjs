import assert from 'node:assert/strict';
import { test } from 'node:test';
import { checkPosts, getAllPosts, getPost, normalizeTags, readingMinutes, validateFrontmatter } from '../src/lib/posts.ts';

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
  for (let i = 1; i < posts.length; i++) assert.ok(posts[i - 1].date >= posts[i].date);
  for (const post of posts) {
    const full = getPost(post.slug);
    assert.equal(full.title, post.title);
    assert.ok(full.content.length > 1500);
    assert.ok(full.readingMinutes >= 1);
  }
  assert.equal(getPost('../package'), null);
  assert.equal(getPost('missing-post'), null);
});
