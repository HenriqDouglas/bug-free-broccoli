function status(request, response) {
  response.status(200).json({ status: "Conexão realizada com sucesso!" });
}

export default status;
