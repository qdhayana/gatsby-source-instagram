// https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/#createremotefilenode

"use strict";

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.downloadMediaFile = async ({
  node,
  getCache,
  createNode,
  createNodeId,
}) => {
  let fileNode;

  if (node.internal.type === `InstaNode`) {
    try {
      fileNode = await createRemoteFileNode({
        url: node.preview,
        parentNodeId: node.id,
        getCache,
        createNode,
        createNodeId,
      });
    } catch (e) {
      console.log(e);
      // Ignore
    }
  }

  // Adds a field `localFile` to the node
  // ___NODE appendix tells Gatsby that this field will link to another node
  if (fileNode) {
    node.localFile___NODE = fileNode.id;
  }

  return node;
};
