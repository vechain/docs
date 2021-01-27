<template>
  <div>
     <p class="submitArticle">
    <a
      :href="$withBase('/tutorials/contribute.html')"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Submit Article</span>
    </a>
  </p>
    <div v-for="post in posts">
      <h2>
        <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
        <span class="author" v-if="post.frontmatter.author">by {{post.frontmatter.author}}</span>  
      </h2>
      <div class="tags">
        <span class="tag" v-for="tag in post.frontmatter.tags">{{tag}}</span>
      </div>

      <p>{{ post.frontmatter.description }}</p>

      <p>
        <router-link :to="post.path">View More → </router-link>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      posts () {
        return this.$site.pages
          .filter(x => x.path.startsWith('/tutorials/') && !x.frontmatter.index_ignore)
          .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
      }
    }
  }
</script>

<style scoped>
  .article {
    margin-bottom: 20px;
    border-left: solid 5px #3eaf7c;
    padding: 20px;
  }
  .tags {
    margin-top: 10px;
  }
  .tag {
    padding: 5px;
    border-radius: 7px;
    font-size: small;
    background: #f3f5f7;
    margin-right: 5px;
    color: #666;
    font-weight: 400;
  }

  .author {
    font-size: small;
    color :gray;
    font-weight: 500;
    
  }
  .submitArticle {
  font-weight: 600;
  background-color: #f3f6f8;
  padding: 0.6em 1.2em;
  border-radius: 8px;
  position: fixed;
  top: 60px;
  right: 20px;
  margin: 1em 0 !important;
  }

</style>