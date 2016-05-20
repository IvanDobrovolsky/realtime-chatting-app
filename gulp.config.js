module.exports = {
    paths: {
        dist: './client/build',
        stylesheets: [
            './node_modules/toastr/build/toastr.min.css',
            './client/src/assets/stylesheets/main.less'
        ],
        images: './client/src/assets/images/**/*.*',
        entry: './client/src/app.js'
    },
    watch: {
        stylesheets: [
            './client/src/assets/stylesheets/**/*.*'
        ]
    }
};