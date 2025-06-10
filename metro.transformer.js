const upstreamTransformer = require("@expo/metro-config/babel-transformer");
const MdxTransformer = require("@bacons/mdx/metro-transformer");
const remarkMDXFrontmatter = require("remark-mdx-frontmatter");
const remarkPrism = require("remark-prism");

const mdxTransformer = MdxTransformer.createTransformer({
  remarkPlugins: [[remarkMDXFrontmatter, { name: "meta" }], remarkPrism],
});

module.exports.transform = async (props) => {
  // Then pass it to the upstream transformer.
  return upstreamTransformer.transform(
    // Transpile MDX first.
    await mdxTransformer.transform(props)
  );
};
