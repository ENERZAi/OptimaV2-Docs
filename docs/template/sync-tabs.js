(function() {
$('.tabbed-set > input').each((_, tab) => {
  const id = tab.id;
  const current = $(`label[for=${id}]`);
  const name = current.text();
  const labels = $(`.tabbed-set > label:contains("${name}"), .tabbed-alternate > .tabbed-labels > label:contains("${name}")`);

  $(tab).click(() => {
    const pos = current.offset().top;

    labels.each((_, o) => {
      $(`input[id=${$(o).attr('for')}]`).prop('checked', true);
    });

    const delta = current.offset().top - pos;
    window.scrollBy(0, delta);
  });
});
})();
