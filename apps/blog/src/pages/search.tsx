import { graphql, PageProps } from 'gatsby';
import type { Data } from '@/models/graphQL';
import { searchToObject } from '@/utils/location';
import { H2 } from '@/atoms';
import { PostList, Seo } from '@/organisms';
import List from '@/templates/list';
import { usePosts } from '@/hooks';

const Search = ({ data, location }: PageProps<Data>) => {
  const posts = usePosts(data.allMarkdownRemark);
  const { keyword } = searchToObject(location.search);
  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLocaleUpperCase().includes(keyword?.toLocaleUpperCase()) ||
      post.summary
        ?.toLocaleUpperCase()
        .includes(keyword?.toLocaleUpperCase()) ||
      !!post.category?.find(
        (x) => x.toLocaleUpperCase() === keyword?.toLocaleUpperCase(),
      ),
  );

  return (
    <List>
      <Seo title="Search" path="/search" />
      {filteredPosts.length ? (
        <H2 textAlign="center" m="50px 0">
          &quot;<span>{keyword}</span>&quot;에 대해 총{' '}
          <span>{filteredPosts.length}</span>건이 검색되었습니다.
        </H2>
      ) : (
        <H2 textAlign="center" m="50px 0">
          &quot;<span>{keyword}</span>&quot;에 대한 검색 결과가 없습니다.
        </H2>
      )}
      <PostList posts={filteredPosts} />
    </List>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: fields___createdDate }) {
      edges {
        node {
          excerpt
          frontmatter {
            thumbnail: featured_img
            summary
            title
            category
          }
          timeToRead
          fields {
            createdDate(formatString: "YYYY-MM-DD")
            slug
          }
        }
      }
    }
  }
`;
export default Search;
