/*global window, document, Ghost, $, Backbone, _ */
(function () {
    "use strict";

    Ghost.Models.Post = Backbone.Model.extend({

        defaults: {
            status: 'draft'
        },

        parse: function (resp) {
            if (resp.tags) {
                // TODO: parse tags into it's own collection on the model (this.tags)
                return resp;
            }
            return resp;
        },

        validate: function (attrs) {
            if (_.isEmpty(attrs.title)) {
                return 'You must specify a title for the post.';
            }
        }
    });

    Ghost.Collections.Posts = Backbone.Collection.extend({
        url: Ghost.settings.apiRoot + '/posts',
        model: Ghost.Models.Post,
        parse: function (resp) {
            if (_.isArray(resp.posts)) {
                this.limit = resp.limit;
                this.currentPage = resp.page;
                this.totalPages = resp.pages;
                this.totalPosts = resp.total;
                return resp.posts;
            }
            return resp;
        }
    });

}());