(function() {
$('.tabbed-set > input').each((index, tab) => {
  const id = tab.id;
  const current = $(`label[for=${id}]`);
  const name = current.text();
  const labels = $(`.tabbed-set > label:contains("${name}"), .tabbed-alternate > .tabbed-labels > label:contains("${name}")`);

  $(tab).click(() => {
    labels.each((index, o) => {
      $(`input[id=${$(o).attr('for')}]`).prop('checked', true);
    });
  });
});
})();
