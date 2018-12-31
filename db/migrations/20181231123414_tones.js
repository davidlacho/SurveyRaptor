exports.up = function(knex, Promise) {
  const updateQualitative_answers = knex.schema.table('qualitative_answers', function(table) {
    table.string('tone');
  });

  const updateQuantiative_answers = knex.schema.table('quantiative_answers', function(table) {
    table.string('tone');
  });

  return Promise.all([updateQualitative_answers, updateQuantiative_answers]);
};

exports.down = function(knex, Promise) {
  const updateQualitative_answers = knex.schema.table('qualitative_answers', function(table) {
    table.dropColumn('tone');
  });

  const updateQuantiative_answers = knex.schema.table('quantiative_answers', function(table) {
    table.dropColumn('tone');
  });

  return Promise.all([updateQualitative_answers, updateQuantiative_answers]);
};
