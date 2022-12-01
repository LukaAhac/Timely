using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using TimelyApi.Application.Core;
using TimelyApi.Data;
using TimelyApi.Models;

namespace TimelyApi.Application.TimeIntervals
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public TimeInterval timeInterval { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken){

                var testIfExists = await _context.TimeIntervals.FindAsync(request.timeInterval.Id);
                if(testIfExists != null){
                    return Result<Unit>.Failure("That already exists!");
                }

                _context.TimeIntervals.Add(request.timeInterval);

                bool result = await _context.SaveChangesAsync() > 0;

                if(!result){
                    return Result<Unit>.Failure("Failed to create activity");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}