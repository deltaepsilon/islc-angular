'use strict';

angular.module('islcAngularApp')
  .service('assetService', function assetService(Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      getImages: function (prefix) {
        // Caching a couple of slow queries. This would be nice to do live, but AWS is just too slow (or maybe that's ISLC...)
//        if (prefix === 'calligraphy/assets/melissa') {
//          return ["https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/melissa\/istilllovecalligraphy-custom-calligraphy-notecards2.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/melissa\/istillloveyou-calligraphy-custom-everyday-im-hustlin.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/melissa\/istillloveyou-calligraphy-custom-lettered-cards-1.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/melissa\/istillloveyou-calligraphy-friendship-cs-lewis-quote-2.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/melissa\/istillloveyou-calligraphy-megans-prayer-2.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/melissa\/melissaesplin-mothersday-card-pack-giveaway-2.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/melissa\/melissaesplin-mothersday-card-pack-giveaway-5.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/melissa\/melissaesplin-mothersday-card-pack-giveaway-6.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/melissa\/melissaesplin-mothersday-card-pack-giveaway-7.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/melissa\/melissaesplin-mothersday-card-pack-giveaway-8.jpg"];
//        } else if (prefix === 'calligraphy/assets/student-work') {
//          return ["https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/student-work\/chickpea-studios.com|juliette_lanvers|1.png","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/student-work\/chickpea-studios.com|juliette_lanvers|2.png","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/student-work\/emilimedesigns.com|emilee_stucky|1.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/student-work\/emilimedesigns.com|emilee_stucky|2.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/student-work\/emilyecavanagh.com|emily_cavanagh.JPG","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/student-work\/kaelasoohoo.com|kaela_soohoo|1.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/student-work\/kaelasoohoo.com|kaela_soohoo|2.jpg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/student-work\/sincerelyserendipity.com|jennifer_lioy|1.jpeg","https:\/\/s3.amazonaws.com\/images.melissaesplin.com\/calligraphy\/assets\/student-work\/sincerelyserendipity.com|jennifer_lioy|2.jpeg"];
//        }
        return Restangular.one('images', prefix.replace(/\//g, '|')).get();
      }
    }
  });
