
function mk_error_response(error) {
  return {
    status: 'error',
    error: error,
  };
}

function mk_ok_response(data) {
  return {
    status: 'ok',
    data: data,
  };
}

module.exports = {
  mk_error_response,
  mk_ok_response,
};