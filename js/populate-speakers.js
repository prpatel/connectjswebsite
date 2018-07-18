function SessionPopulator(sessionInfo, $parentObj) {
  if (!sessionInfo.speaker.avatar) {
    sessionInfo.speaker.avatar = 'http://lorempixel.com/200/200/people'
  }

  var removeSpecialChars = function(str) {
    return str.replace(/\W/g, '');
  };

  var sessionPopulator = {
    speaker: sessionInfo.speaker,
    sessionName: sessionInfo.sessionName,
    sessionDesc: sessionInfo.description,
    modalId: removeSpecialChars(sessionInfo.sessionName) + removeSpecialChars(sessionInfo.speaker.name),
    appendSessionTile: function() {
      var speakerTile = '<div class="col-sm-3 col-md-3 col-lg-3 speaker-tile">' +
                    '<div class="speaker-promo-list">' +

                        '<div class="session-style">' +
                            '<a data-toggle="modal" data-target="#' + this.modalId + '" title="' + this.sessionName +
                            '">' + this.sessionName +
                            '</a>' +
                        '</div>' +
                            '<h4 class="row-centered"> ' + this.speaker.name + ' </h4>' +
                            '<a href="' + this.speaker.twitterUrl + '">' +
                                '<div class="speaker-image" style="background-image:url(' + this.speaker.avatar + 
                                ')"></div>' +
                            '</a>' +
                            this.getSecondSpeakerHtml(false) +
                        '</div>' +
                    '</div>' +
                '</div>';
      $parentObj.append(speakerTile);
    },

    appendSpeakerModal: function() {
    var speakerModal = '<div class="modal fade" id="' + this.modalId + 
                        '" tabindex="-1" role="dialog" aria-labelledby="headingOne-' + this.modalId + '">' +
                        '<div class="modal-dialog" role="document">' +
                            '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                    '<button type="button" class="close" data-dismiss="modal" ' + 'aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                    '<h4 class="modal-title">' + this.sessionName + '</h4>' +
                                '</div>' +
                                '<div class="modal-body panel-body-session">' + this.sessionDesc + '</div>' +
                                '<h4 class="row-centered"> ' + this.speaker.name + ' </h4>' +
                                '<a href="' + this.speaker.twitterUrl + '">' +
                                    '<div class="speaker-image" style="background-image:url(' + this.speaker.avatar +
                                    ')"></div>' +
                                '</a>' +
                                '<div class="panel-body-session-nobg">' + this.speaker.bio + '</div>' +
                                this.getSecondSpeakerHtml() +
                            '</div>' +
                        '</div>' +
                    '</div>';
      $parentObj.append(speakerModal);
    },

    getSecondSpeakerHtml: function(descriptionFlag) {
        if (sessionInfo.speaker2) {
            return '<h4 class="row-centered"> ' + sessionInfo.speaker2.name + ' </h4>' +
            '<a href="' + sessionInfo.speaker2.twitterUrl + '">' +
                '<div class="speaker-image" style="background-image:url(' + sessionInfo.speaker2.avatar +
                ')"></div>' +
            '</a>' +
            (descriptionFlag !== false ? '<div class="panel-body-session-nobg">' + sessionInfo.speaker2.bio + '</div>' : '')
        }
        return '';
    }
  };
  return sessionPopulator;
}

$(document).ready(function() {
    var sections = {
        angular: 'accordion-94',
        vue: 'accordion-95',
        ios: 'accordion-97',
        design: 'accordion-99',
        node: 'accordion-100',
        android: 'accordion-105',
        react: 'accordion-93',
        mobile: 'accordion-98',
        web: 'accordion-96',
        core: 'accordion-101',
        other: 'accordion-102',
        advanced: 'accordion-92'
    };

    for (var key in sections) {
        if (key && sections[key]) {
            for(var i = 0; i < sessions[key].length; i++) {
                var populator = new SessionPopulator(sessions[key][i], $('#' + sections[key]));
                populator.appendSessionTile();
                populator.appendSpeakerModal();
            }
        }
    }
});