// hodor-test expect-message: stray semicolon
return (
  <div>
    {items.map((item) => (
      <Item item={item} />
    ))}
    ;
  </div>
);
