 //disable form submission
  $("form").on("keyup keypress", (e) => {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      return false;
    }
  });

  var queryString = window.location.search
  var urlParams = new URLSearchParams(queryString);

  $("[wf-util-cmssearch-input]").each( (x) => {
    x++;
    var paramFlag = $(`[wf-util-cmssearch-input="search-${x}"]`).data('url')
    $(`[wf-util-cmssearch-search="cms-item-${x}"]`).hide();
    $(`[wf-util-cmssearch-div="noResult-${x}"]`).hide();

    $(`[wf-util-cmssearch-input="search-${x}"]`).on("input", () => {
      for (y of $(`[wf-util-cmssearch-text="search-${x}"]`)) {
        if (
          $(y)
          .text()
          .toString()
          .toLowerCase()
          .includes($(this).val().toLowerCase()) &&
          $(this).val() !== ""
        ) {
          $(`[wf-util-cmssearch-text="search-${x}"]:contains("${$(y).text()}")`)
            .parents(`[wf-util-cmssearch-search="cms-item-${x}"]`)
            .show();
        } else {
          $(`[wf-util-cmssearch-text="search-${x}"]:contains("${$(y).text()}")`)
            .parents(`[wf-util-cmssearch-search="cms-item-${x}"]`)
            .hide();
        }
      }

      if (
        $(`[wf-util-cmssearch-search="cms-item-${x}"][style="display: none;"]`).length ===
        $(`[wf-util-cmssearch-search="cms-item-${x}"]`).length &&
        $(this).val() !== ""
      ) {
        console.log("No Result");
        $(`[wf-util-cmssearch-div="noResult-${x}"]`).show();
      } else {
        $(`[wf-util-cmssearch-div="noResult-${x}"]`).hide();
      }

      if(paramFlag){
        var search = $(this).val();
        var url = new URL(window.location);
        url.searchParams.set(`search-${x}`, search);
        if(search === ''){
          url.searchParams.delete(`search-${x}`);
        }
        window.history.pushState({}, '', url);
      }
    });

    if(paramFlag){
      if(urlParams.get(`search-${x}`)){
        $(`[wf-util-cmssearch-input="search-${x}"]`).val(urlParams.get(`search-${x}`))
        $(`[wf-util-cmssearch-input="search-${x}"]`).trigger('input')
      }
    }
  });