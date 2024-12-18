test("GET to /api/vi/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  //verifica o status da resposta
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  //valida o campo `updated_at`
  expect(responseBody.updated_at).toBeDefined();
  const parsedUPdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(parsedUPdatedAt);

  //valida a estrutura do campo `dependencies`
  expect(responseBody.dependencies).toBeDefined();

  //valida que o `postgre_version` segue o formato correto
  const postgreVersion = responseBody.dependencies.database.postgre_version;
  expect(postgreVersion).toEqual("16.6");

  // Valida que `max_connections` e `used_connections` são números coerentes
  const maxConnections = responseBody.dependencies.database.max_connections;
  const usedConnections = responseBody.dependencies.database.used_connections;
  
  expect(maxConnections).toBe(100);
  expect(usedConnections).toBe(1);
  expect(usedConnections).toBeLessThanOrEqual(maxConnections); // Em uso <= máximo permitido
});
