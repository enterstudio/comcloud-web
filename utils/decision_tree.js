var ml = require('machine_learning');
var _ = require('underscore');



var decision_tree = function() {

    // WORD | FIELD
    this.trainingData = [
      ['Correo', 1],
      ['electronico', 1],
      ['electronicos', 1],
      ['electronica', 1],
      ['e-mail', 1],
      ['enviar', 1],
      ['recibir', 1],
      ['cartas', 1],
      ['digitales', 1],
      ['SMTP', 1],
      ['chat', 1],
      ['charla', 1],
      ['cibercharla', 1],
      ['instantánea', 1],
      ['conversación)', 1],
      ['mensajería', 1],  
      ['cliente', 1],
      ['XMPP', 1],
      ['Yahoo', 1],
      ['Messenger', 1],
      ['Google', 1],
      ['Skype', 1],
      ['emoticonos', 1],
      ['documento', 2],
      ['documentos', 2],
      ['word', 2],
      ['hojas', 2],
      ['calculo', 2],
      ['gestion', 2],
      ['tareas', 2],
      ['electronico', 2],
      ['electronicos', 2],
      ['electronica', 2],
      ['enviar', 2],
      ['recibir', 2],
      ['digitales', 2],
      ['cliente', 2],
      ['Yahoo', 2],
      ['Messenger', 2],
      ['Google', 2],
      ['Skype', 2],
      ['emoticonos', 2],
    ];

    this.result = [
        'zimbra','zimbra', 'zimbra', 'zimbra', 'zimbra', 'zimbra', 
        'zimbra', 'zimbra', 'zimbra', 'zimbra', 
        'openfire', 'openfire', 'openfire', 'openfire', 'openfire',
        'openfire', 'openfire', 'openfire', 'openfire', 'openfire', 
        'openfire', 'openfire', 'openfire', 
        'owncloud', 'owncloud', 'owncloud', 'owncloud', 'owncloud', 
        'redmine', 'redmine', 
        'redmine', 'redmine', 'redmine', 'redmine', 'redmine', 'owncloud', 
        'redmine', 'redmine', 'redmine', 'redmine', 'redmine', 'redmine' 
    ];

}


decision_tree.prototype.deduce = function(field1, field2) {
    var apps = Array();

    var dt = new ml.DecisionTree({
        data : this.trainingData,
        result : this.result
    });

    dt.build();

    apps.push(training(dt, field1, 1));
    apps.push(training(dt, field2, 2));

    var res = apps[0].concat(apps[1]);
    
    return res;
}

function training(dt, fieldData, f) {
    var words = fieldData.split(/\s+/);
    var srvs = Array();

    _.forEach(words, function(v) {
        var w = v.replace(/,$/,'');
        if (w.length > 3) {
            var classify = dt.classify([w,f]);
            var r = _.map(classify, function(value, key) {
                return key;
            });

            srvs.push(r[0]);
        }
    });

    return _.uniq(srvs, function(item, key, a) {
        return item;
    });

}


module.exports = decision_tree;
