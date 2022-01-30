export async function getStaticProps(context) {
    return {
      props: {
          initialFeedback: []
      },
    }
}

export async function getStaticPaths() {
    return {
      paths: [
        { params: { 
            siteId: 'Jbr0mK2NYtLDcja8oUF7'
        } }
      ],
      fallback: false
    };
}

const SiteFeedback = () => {
    return 'Hello, world!'
}

export default SiteFeedback