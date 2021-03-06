import assert from 'assert';
import liveResolverQuery from '@octolinker/resolver-live-query';
import python from '../index';

describe('python', () => {
  const path = '/octo/dog.py';

  it('resolves local file', () => {
    assert.deepEqual(python.resolve(path, ['.foo']), '{BASE_URL}/octo/foo.py');
  });

  it('resolves init file', () => {
    assert.deepEqual(
      python.resolve(path, ['.']),
      '{BASE_URL}/octo/__init__.py',
    );
  });

  it('resolves package', () => {
    assert.deepEqual(
      python.resolve(path, ['foo'])[1],
      liveResolverQuery({ type: 'pypi', target: 'foo' }),
    );
  });

  it('resolves scope package', () => {
    assert.deepEqual(
      python.resolve(path, ['foo.bar'])[1],
      liveResolverQuery({ type: 'pypi', target: 'foo' }),
    );
  });

  it('resolves buildin', () => {
    assert.deepEqual(
      python.resolve(path, ['foo'])[0],
      'https://docs.python.org/3/library/foo.html',
    );
  });
});
